// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.8.0;

contract Tournament {
    address[] public games;

    event newGame(
        address game
    );

    function createGame() public {
        uint minimum = 1;
        FlipCoinGame game = new FlipCoinGame(minimum);
        games.push(address(game));
        emit newGame(address(game));
    }

    function getGames() public view returns (address[] memory) {
        return games;
    }
}

contract FlipCoinGame {

    bool public finished = false;
    bool public withdrew = false;

    address public starter;
    address public winner;

    uint public minAmount;
    uint public amount;

    constructor(uint minimun) public {
        minAmount = minimun;
    }

    modifier notFinished {
        require(!finished, 'Game is finished');
        _;
    }

    modifier minimum {
        require(msg.value >= minAmount, 'You have to bet more than the minimum amount');
        _;
    }

    function start() public payable notFinished minimum {
        require(starter == address(0), "Player already assigned");
        amount = msg.value;
        starter = msg.sender;
    }

    // The user who finishes the game is going to pay more gas.
    function play() public payable notFinished minimum returns (address) {
        require(starter != address(0), "Starter is not set");
        require(starter != msg.sender, "Player already in the game");
        require(msg.value == amount, "You are exceeding the amount");

        uint8 winnerIndex = random() % 2;

        winner = winnerIndex == 0 ? msg.sender : starter;
        finished = true;

        return winner;
    }

    function withdraw() public {
        require(msg.sender == winner, 'You are not the winner');
        require(withdrew == false, 'Founds were withdraw');

        withdrew = true;
        msg.sender.transfer(address(this).balance);
    }

    // Un-safe random function
    function random() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251);
    }
}
