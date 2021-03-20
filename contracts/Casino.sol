// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

contract Casino {
    Game[] public games;
    Gambler[] public gamblers;
    mapping(Gambler => bool) public gamblerRegistered;

    event newGame(
        Game game
    );

    function createGame(Gambler gambler) public payable {
        Game game = new Game();

        // Foward bit to the game contract
        game.start{value: msg.value}(gambler);

        // Store game in log
        games.push(game);
        registerGambler(gambler);

        emit newGame(game);
    }

    function registerGambler(Gambler gambler) public {
        if (gamblerRegistered[gambler] == false) {
            gamblers.push(gambler);
            gamblerRegistered[gambler] = true;
        }
    }

    function getGames() public view returns (Game[] memory) {
        return games;
    }

    function getGamblers() public view returns (Gambler[] memory) {
        return gamblers;
    }

    function getGameCount() public view returns (uint256) {
        return games.length;
    }
}


contract Game {

    event gameFinished(
        Gambler winner
    );

    uint public minAmount = 10000;
    uint public bitAmount;

    bool public finished = false;

    Gambler public player1;
    Gambler public player2;

    Gambler public winner;

    modifier notFinished {
        require(!finished, 'Game is finished');
        _;
    }

    function start(Gambler gambler) public payable {
        require(msg.value >= minAmount, 'You have to bet more than the minimum amount');
        player1 = gambler;
        bitAmount = msg.value;
    }

    // The user who finishes the game is going to pay more gas.
    function play(Gambler gambler) public payable notFinished {
        require(address(player1) != address(0), "Starter is not set");
        require(player1.addr() != gambler.addr(), "Player already in the game");
        require(msg.value == bitAmount, "You have to send the bit amount");

        finished = true;
        player2 = gambler;

        uint8 winnerIndex = random() % 2;

        if (winnerIndex == 0) {
            winner = player2;
        } else {
            winner = player1;
        }

        winner.receivePrize{value: address(this).balance}(this);

        emit gameFinished(winner);
    }

    // Un-safe random function
    function random() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251);
    }
}


contract Gambler {
    address[] public gamblerGames;
    address[] public gamesWon;

    address public addr;
    string public name;
    bool private withdrawing = false;

    constructor(address gamblerAddress, string memory gamblerName) {
        addr = gamblerAddress;
        name = gamblerName;
    }

    function receivePrize(Game gameWon) public payable {
        require(msg.value > 0, 'no prize received');

        gamesWon.push(address(gameWon));
    }

    function withdraw() public {
        uint256 amount = address(this).balance;

        require(msg.sender == addr, 'you are not allow to withdraw the funds');
        require(!withdrawing, 'Transacting in progress');
        require(amount > 0, 'nothing to withdraw');

        withdrawing = true;
        payable(addr).transfer(amount);
        withdrawing = false;
    }

    function numGamesWon() public view returns (uint256) {
        return gamesWon.length;
    }
}
