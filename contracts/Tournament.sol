// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

contract Tournament {
    address[] public games;
    uint public minAmount = 10000;

    event newGame(
        address game
    );

    function createGame() public payable {
        require(msg.value >= minAmount, 'You have to bet more than the minimum amount');
        FlipCoinGame game = new FlipCoinGame();
        game.start{value: msg.value}(msg.sender);
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

    address payable public gambler;
    address payable public winner;

    uint public bitAmount;

    function start(address _gambler) public payable {
        require(gambler == address(0), "Gambler already set");
        bitAmount = msg.value;
        gambler = payable(_gambler);
    }

    modifier notFinished {
        require(!finished, 'Game is finished');
        _;
    }

    // The user who finishes the game is going to pay more gas.
    function play() public payable notFinished returns (address) {
        require(gambler != address(0), "Starter is not set");
        require(gambler != msg.sender, "Player already in the game");
        require(msg.value == bitAmount, "You are exceeding the amount");

        uint8 winnerIndex = random() % 2;

        winner = winnerIndex == 0 ? payable(msg.sender) : gambler;
        finished = true;

        return winner;
    }

    function withdraw() public {
        require(msg.sender == winner, 'You are not the winner');
        require(withdrew == false, 'Founds were withdraw');

        withdrew = true;
        winner.transfer(address(this).balance);
    }

    // Un-safe random function
    function random() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251);
    }
}
