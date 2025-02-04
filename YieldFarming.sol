// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YieldFarming {
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public depositTime;
    uint256 public farmingRate = 15; // 15% reward

    function deposit() external payable {
        require(msg.value > 0, "Harus menyetor likuiditas");
        deposits[msg.sender] += msg.value;
        depositTime[msg.sender] = block.timestamp;
    }

    function withdraw() external {
        require(deposits[msg.sender] > 0, "Tidak ada saldo");
        uint256 duration = block.timestamp - depositTime[msg.sender];
        uint256 reward = (deposits[msg.sender] * farmingRate * duration) / (365 days * 100);
        uint256 total = deposits[msg.sender] + reward;

        deposits[msg.sender] = 0;
        depositTime[msg.sender] = 0;
        payable(msg.sender).transfer(total);
    }
}


---
