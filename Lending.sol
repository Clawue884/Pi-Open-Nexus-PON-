// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lending {
    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interestRate;
        uint256 dueDate;
        bool repaid;
    }

    mapping(address => Loan) public loans;

    function requestLoan(uint256 _amount, uint256 _interestRate, uint256 _days) external {
        require(loans[msg.sender].amount == 0, "Pinjaman masih aktif");
        loans[msg.sender] = Loan(msg.sender, _amount, _interestRate, block.timestamp + (_days * 1 days), false);
    }

    function repayLoan() external payable {
        require(loans[msg.sender].amount > 0, "Tidak ada pinjaman aktif");
        require(msg.value >= loans[msg.sender].amount + (loans[msg.sender].amount * loans[msg.sender].interestRate / 100), "Jumlah tidak cukup");

        loans[msg.sender].repaid = true;
        loans[msg.sender].amount = 0;
    }
}


---
