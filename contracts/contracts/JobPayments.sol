// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract JobPayments {
    address public admin;
    struct Payment { address payer; uint256 amount; uint256 timestamp; }
    Payment[] public payments;
    event PaymentReceived(address indexed payer, uint256 amount, uint256 timestamp);

    constructor() { admin = msg.sender; }

    function logPayment() external payable {
        require(msg.value > 0, "No value sent");
        payments.push(Payment(msg.sender, msg.value, block.timestamp));
        emit PaymentReceived(msg.sender, msg.value, block.timestamp);
    }

    function getPayments() external view returns (Payment[] memory) { return payments; }
}
