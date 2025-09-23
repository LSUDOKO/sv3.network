// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Message {
  string public message = '📜 Sign, Store, and Verify; On-Chain.!';

  event SetMessage(address sender, string purpose);

  constructor() {}

  function setMessage(string memory _message) public payable {
    message = _message;
    
    emit SetMessage(msg.sender, _message);
  }
}
