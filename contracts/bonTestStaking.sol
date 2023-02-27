// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/*
NOTES:
- from @ https://chainstack.com/deploying-an-nft-staking-contract-on-gnosis-chain/ 
- need to emit after stake unstake funcs
- need a func to provide readable time left till withdrawl
- vvv Do I need this to recieve the erc20 tokens???
    interface IReceiver {
        function receiveTokens(address tokenAddress, uint256 amount) external;
    }
- need to change the withdrawAll to allow 'all thats left' on last transfer
*/

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
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
    uint256 public rwdRate = 1; // 0.1% of the CURRENT $BON balance
    bool public isStakeActive;

    constructor(address _nftAddress, address _bonAddress){
        nft = IERC721(_nftAddress);
        bonToken = IERC20(_bonAddress);
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
        uint bonBalance = bonToken.balanceOf(address(this)); 
        return bonBalance * (rwdRate / 1000);
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
        require(transferOne, "Transfer failed."); //this needs to be ERC20-ified
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
    function setRate(uint256 _rwdRate) external onlyOwner {
        rwdRate = _rwdRate;
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
