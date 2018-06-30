pragma solidity ^0.4.19;

contract simplestorage {
  uint public storedData;

  function simplestorage(uint initVal) {
    storedData = initVal;
  }

  function set(uint x) {
    storedData = x;
    Change(msg.sender);
  }

  function get() constant returns (uint retVal) {
    return storedData;
  }
  
  event Change(address indexed _owner);
  
}
