// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public stakingTime;
    uint256 public rewardRate = 10; // 10% reward

    function stake() external payable {
        require(msg.value > 0, "Harus menyetor Pi");
        balances[msg.sender] += msg.value;
        stakingTime[msg.sender] = block.timestamp;
    }

    function withdraw() external {
        require(balances[msg.sender] > 0, "Tidak ada saldo");
        uint256 duration = block.timestamp - stakingTime[msg.sender];
        uint256 reward = (balances[msg.sender] * rewardRate * duration) / (365 days * 100);
        uint256 total = balances[msg.sender] + reward;

        balances[msg.sender] = 0;
        stakingTime[msg.sender] = 0;
        payable(msg.sender).transfer(total);
    }
}


---
