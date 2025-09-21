// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Message.sol";

contract MessageTest {
    Message public messageContract;
    
    function setUp() public {
        messageContract = new Message();
    }
    
    function test_InitialMessage() public {
        string memory expected = "Quickly ship Web3 Apps!";
        string memory actual = messageContract.message();
        require(
            keccak256(abi.encodePacked(actual)) == keccak256(abi.encodePacked(expected)),
            "Initial message should match expected value"
        );
    }
    
    function test_SetMessage() public {
        string memory newMessage = "Hello, Hardhat v3!";
        
        messageContract.setMessage(newMessage);
        string memory actual = messageContract.message();
        require(
            keccak256(abi.encodePacked(actual)) == keccak256(abi.encodePacked(newMessage)),
            "Message should be updated correctly"
        );
    }
    
    function testFuzz_SetMessage(string memory _message) public {
        // Skip empty strings as they're not allowed by the contract
        if (bytes(_message).length == 0) return;
        
        messageContract.setMessage(_message);
        string memory actual = messageContract.message();
        require(
            keccak256(abi.encodePacked(actual)) == keccak256(abi.encodePacked(_message)),
            "Fuzz test: Message should be set correctly"
        );
    }
    
    function test_SetMessageWithValue() public {
        string memory newMessage = "Paid message";
        uint256 value = 1 ether;
        
        // Send value with the transaction
        messageContract.setMessage{value: value}(newMessage);
        string memory actual = messageContract.message();
        require(
            keccak256(abi.encodePacked(actual)) == keccak256(abi.encodePacked(newMessage)),
            "Message with value should be set correctly"
        );
    }
}