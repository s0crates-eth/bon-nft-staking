// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/*
NOTES:
- from @ https://chainstack.com/deploying-an-nft-staking-contract-on-gnosis-chain/ 
- NEEDS to be tested on testnet and then peerchecked
*/

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Rewards is ERC721Holder, Ownable {
    IERC721 public nft;
    mapping(uint256 => address) public tokenOwnerOf;
    mapping(uint256 => uint256) public tokenStakedAt;
    mapping(uint256 => bool) public isStaked;

    uint256 public minimumTime = 7 days;
    uint256 public price = 420690000000000000; // 0.42069 matic tax
    bool public isStakeActive;

    constructor(address _nft){
        nft = IERC721(_nft);
    }

    function stake(uint256 tokenId) external {
        require(isStakeActive, "Staking is paused.");
        require(price <= msg.value, "Insufficient gas value");
        nft.safeTransferFrom(msg.sender, address(this), tokenId);
        tokenOwnerOf[tokenId] = msg.sender;
        tokenStakedAt[tokenId] = block.timestamp;
        isStaked[tokenId] = true;
    }
    //^^ may need some sort of revert check to make sure the NFT was able to be transfered/recieved?

    function calculateRewards(uint256 tokenId) public view returns (uint256) {
        require(isStaked[tokenId], "This Token id was never staked");
        uint256 balance = address(this).balance;
        return balance * 1 / 1000; // 0.1% of the CURRENT contract balance
    }

    function unstake(uint256 tokenId) external payable{
        uint256 timeElapsed = block.timestamp - tokenStakedAt[tokenId];
        uint256 userReward = calculateRewards(tokenId);

        require(tokenOwnerOf[tokenId] == msg.sender, "You can't unstake because you are not the owner");
        require(timeElapsed >= minimumTime, "You must wait the minimum time before claiming rewards");
        require(userReward > 0, "No rewards to claim");
        require(price <= msg.value, "Insufficient transaction gas value");
        
        delete tokenOwnerOf[tokenId];
        delete tokenStakedAt[tokenId];
        delete isStaked[tokenId];

        ( bool transferOne, ) = payable(msg.sender).call{value: userReward}("");
        require(transferOne, "Transfer failed.");
        nft.transferFrom(address(this), msg.sender, tokenId);
    }
    //^^ this might need a reentrancy guard?

    // onlyOwnerz
    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }
    function setTime(uint256 _minimumTime) external onlyOwner {
        minimumTime = _minimumTime;
    }
    function flipStakeState() external onlyOwner {
        isStakeActive = !isStakeActive;
    }
    function closePool() external payable onlyOwner {
        uint256 balance = address(this).balance;
        uint256 bonTreasury = balance * 70 / 100;
        uint256 bonStakers = balance * 20 / 100;
        uint256 bonDevs = balance * 10 / 100;
        ( bool transferOne, ) = payable(0xd02b97b0B3439bf032a237f712a5fa5B161D89d3).call{value: bonTreasury}("");
        ( bool transferTwo, ) = payable(0xad87F2c6934e6C777D95aF2204653B2082c453de).call{value: bonStakers}("");
        ( bool transferThree, ) = payable(0xb1a23cD1dcB4F07C9d766f2776CAa81d33fa0Ede).call{value: bonDevs}("");
        require(transferOne && transferTwo && transferThree, "Transfer failed.");
    }
}
