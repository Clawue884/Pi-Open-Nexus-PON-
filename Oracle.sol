// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Oracle {
    address public owner;
    mapping(bytes32 => bool) public dataValidity;
    event DataVerified(bytes32 indexed requestId, bool isValid);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    function submitData(bytes32 requestId, bool isValid) external onlyOwner {
        dataValidity[requestId] = isValid;
        emit DataVerified(requestId, isValid);
    }

    function getDataValidity(bytes32 requestId) external view returns (bool) {
        return dataValidity[requestId];
    }
}


---
