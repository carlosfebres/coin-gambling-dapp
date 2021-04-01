# Micro DAO

### Personal Intro

I am passionate about technology and also a very curious person. These two great aspects combined led me to start learning about computers from a very young age, writing my first line of code at 15 years old, back then it was my hobby, now it’s been my career for almost 5 years. I’ve never stopped seeking knowledge and instead I have made an effort to improve day-by-day.

**[My Linkedin Profile](https://www.linkedin.com/in/carlos-febres/)**

### Time-Frame

20 hours

### Description

The project was built with React and Ethers.js. I also created and deployed smart contracts with Solidity, and Hardhat. It consists of a Casino in which you’re able to bet against players on a coin flip, if it’s heads you win, if not, you lose. The project handles the creation, management, and history of games, also the creation and history of gambles. The game contract receives the money from the gamblers and also sends the money to the winner.

### Process

- First create a gambler, it'll create an instance of the `Gambler` contract. This contract will keep a record of the games and receive the earnings form the games won.

  ![Create Gambler](https://user-images.githubusercontent.com/2939980/113249306-7ae77d00-928c-11eb-941e-d1ed24aa052e.png)


- After registering as a gambler, you'll be able to play games or create a new one.

  ![Create Gambler](https://user-images.githubusercontent.com/2939980/113249627-fea16980-928c-11eb-9e2c-6bc59673c784.png)


- To play, click the play button, this will determine how is the winner and send the money to the winner's gambler.

  ![Play Game](https://user-images.githubusercontent.com/2939980/113249671-15e05700-928d-11eb-993e-be203d6689bb.png)


- If you win, you'll be able to withdraw the funds by clicking the wallet badge.

  ![Withdraw Funds](https://user-images.githubusercontent.com/2939980/113249705-27c1fa00-928d-11eb-98a5-26f891baffd4.png)

### Closing Notes

The project is a beta stage, in which there are many parts that can be improved:
- The smarts contracts have to be optimized and audited.
- The UI can take advantage of the screen size.
