/*

From:
https://chainstack.com/deploying-an-nft-staking-contract-on-gnosis-chain/ 

*/

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Rewards is ERC20, ERC721Holder, Ownable {
    IERC721 public nft;
    mapping(uint256 => address) public tokenOwnerOf;
    mapping(uint256 => uint256) public tokenStakedAt;
    mapping(uint256 => bool) public isStaked;
    uint256 public rewardsPerHour = (1 * 10 ** decimals()) / 1 hours;
    constructor(address _nft) ERC20("Reward", "RWD") {
        nft = IERC721(_nft);
    }
    function stake(uint256 tokenId) external {
        nft.safeTransferFrom(msg.sender, address(this), tokenId);
        tokenOwnerOf[tokenId] = msg.sender;
        tokenStakedAt[tokenId] = block.timestamp;
        isStaked[tokenId] = true;
    }
    function calculateRewards(uint256 tokenId) public view returns (uint256) {
        require(isStaked[tokenId], "This Token id was never staked");
        uint timeElapsed = block.timestamp - tokenStakedAt[tokenId];
        return timeElapsed * rewardsPerHour;
    }
    function unstake(uint256 tokenId) external {
        uint timeElapsed = block.timestamp - tokenStakedAt[tokenId];
        uint minimumTime = 7 days;
        require(tokenOwnerOf[tokenId] == msg.sender, "You can't unstake because you are not the owner");
        require(timeElapsed >= minimumTime, "You need to stake for at least 7 days");
        _mint(msg.sender, calculateRewards(tokenId));
        nft.transferFrom(address(this), msg.sender, tokenId);
        delete tokenOwnerOf[tokenId];
        delete tokenStakedAt[tokenId];
        delete isStaked[tokenId];
    }
}