import React from "react";
import { Game } from "../../store/Game/game.models";
import { ethers } from "ethers";
import { useRootSelector } from "../../store/utils";
import {
  CircularProgress,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useGameContract } from "../../hooks/useGameContract";
import { getGamblerAddress } from "../../store/Gambler/gambler.selector";
import { useGameListener } from "../../hooks/useGameListeners";
import { isGamblerAPlayer } from "../../store/Game/game.utils";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import VideogameIcon from "@material-ui/icons/VideogameAsset";
import { formatShortAddress, isGamblerWinner } from "../../shared/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      backgroundColor: "#263238",
      borderRadius: 16,
    },
    moneyIcon: {
      color: "rgb(50,205,50)",
    },
    walletIcon: {
      color: "rgb(255,255,255)",
    },
    moneyOffIcon: {
      color: "rgb(255,0,0)",
    },
  })
);

type GameProps = {
  game: Game;
};

const GameItemIcon: React.FC<GameProps> = ({ game }) => {
  const styles = useStyles();
  const gamblerAddress = useRootSelector(getGamblerAddress);

  if (game.finished) {
    if (isGamblerWinner(game, gamblerAddress || ""))
      return <MoneyIcon className={styles.moneyIcon} fontSize="large" />;
    if (gamblerAddress && isGamblerAPlayer(game, gamblerAddress))
      return <MoneyOffIcon className={styles.moneyOffIcon} fontSize="large" />;
    return <WalletIcon className={styles.walletIcon} fontSize="large" />;
  }
  return <VideogameIcon className={styles.walletIcon} fontSize="large" />;
};

export const GameItem: React.FC<GameProps> = ({ game }) => {
  const styles = useStyles();

  useGameListener(game);

  const gamblerAddress = useRootSelector(getGamblerAddress);
  const { play, isPlaying } = useGameContract(game);

  if (!game) {
    return <h4>Game not found</h4>;
  }

  const imGambler =
    game.player1 === gamblerAddress || game.player2 === gamblerAddress;

  const secondaryText = game.finished
    ? `Game won by: ${formatShortAddress(game.winner)}`
    : `Game started by: ${formatShortAddress(game.player1)}`;
  const formattedBetAmount = ethers.utils.formatEther(game.betAmount);

  return (
    <React.Fragment>
      <ListItem className={styles.container}>
        <ListItemAvatar>
          <GameItemIcon game={game} />
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{ style: { color: "white" } }}
          primary={`${formattedBetAmount} ETH`}
          secondary={secondaryText}
        />
        {!imGambler && !game.finished ? (
          <ListItemSecondaryAction>
            {isPlaying ? (
              <CircularProgress color="secondary" size={24} />
            ) : (
              <IconButton
                color="secondary"
                onClick={play}
                edge="end"
                aria-label="play"
              >
                <PlayIcon />
              </IconButton>
            )}
          </ListItemSecondaryAction>
        ) : null}
      </ListItem>
    </React.Fragment>
  );
};
