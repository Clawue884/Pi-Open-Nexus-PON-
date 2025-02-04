// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PiBridge {
    address public admin;
    mapping(address => uint256) public balances;

    event TransferToStellar(address indexed user, uint256 amount, string stellarAddress);
    event TransferToBSC(address indexed user, uint256 amount);

    constructor() {
        admin = msg.sender;
    }

    function deposit(uint256 amount, string memory stellarAddress) public {
        balances[msg.sender] += amount;
        emit TransferToStellar(msg.sender, amount, stellarAddress);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        emit TransferToBSC(msg.sender, amount);
    }
}
