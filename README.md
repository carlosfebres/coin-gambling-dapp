# Coin Flip - dApp

### Description

The project was built with React and Ethers.js. I also created and deployed smart contracts with Solidity, and Hardhat. It consists of a Casino in which you’re able to bet against players on a coin flip, if it’s heads you win, if not, you lose. The project handles the creation, management, and history of games, also the creation and history of gambles. The game contract receives the money from the gamblers and also sends the money to the winner.

### Time-Frame

20 hours

### Local Run

1. install dependencies by running `npm install`
2. create a `.env` file and add the `REACT_APP_CONTRACT_ADDRESS` environment variable with the address of the Casino contract instance.
 
    You could use the Casino contract instance deployed in the Rinkeby Network by adding this line to the `.env` file:
```dotenv
REACT_APP_CONTRACT_ADDRESS=0x3A4d5EB2668Bd13e429874876EC339F6c5F2090A
```
3. run `npm start` to start the app.

### Process

- First create a gambler, it'll create an instance of the `Gambler` contract. This contract will keep a record of the games played and receive the earnings from the games won.

  ![Create Gambler](https://raw.githubusercontent.com/carlosfebres/coin-gambling-dapp/main/src/images/gifs/create_gambler.gif)


- After registering as a gambler, you'll be able to play games or create a new one.

  ![Create Gambler](https://raw.githubusercontent.com/carlosfebres/coin-gambling-dapp/main/src/images/gifs/create_game.gif)


- To play, click the play button, this will determine how is the winner and send the money to the winner's gambler contract.

  ![Play Game](https://raw.githubusercontent.com/carlosfebres/coin-gambling-dapp/main/src/images/gifs/play_game.gif)


- If you win, you'll be able to withdraw the funds by clicking the wallet badge.

  ![Withdraw Funds](https://raw.githubusercontent.com/carlosfebres/coin-gambling-dapp/main/src/images/gifs/withdraw_funds.gif)

### Closing Notes

The project is in a beta stage, in which there are many parts that can be improved:
- The smarts contracts have to be optimized and audited.
- The UI can take advantage of the screen size.
- Alert the user if a transaction was completed successfully or if an error has occurred.
