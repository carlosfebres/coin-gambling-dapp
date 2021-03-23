import React, { useEffect } from "react";
import { Game } from "../../store/Game/game.models";
import { useDispatch } from "react-redux";
import { fetchGameByAddress } from "../../store/Game/game.slide";
import { useRootSelector } from "../../store/utils";
import { getGameByAddress } from "../../store/Game/game.selectors";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { useGameContract } from "../../hooks/useGameContract";
import { getGamblerAddress } from "../../store/Gambler/gambler.selector";
import { useGameListener } from "../../hooks/useGameListeners";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { ethers } from "ethers";
import { createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 16,
    },
    moneyIcon: {
      color: "rgb(50,205,50)",
    },
  })
);

type GameProps = {
  address: Game["address"];
};

export const GameItem: React.FC<GameProps> = ({ address }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const game = useRootSelector(getGameByAddress(address));
  const gamblerAddress = useRootSelector(getGamblerAddress);

  useGameListener(address);

  const { play } = useGameContract(address);

  useEffect(() => {
    dispatch(fetchGameByAddress(address));
  }, []);

  if (!game) {
    return <h4>Game not found</h4>;
  }

  const imGambler =
    game.player1 === gamblerAddress || game.player2 === gamblerAddress;

  const secondaryText = game.finished
    ? `Game won by: ${game.winner}`
    : `Game started by: ${game.player1}`;
  const formattedBetAmount = ethers.utils.formatUnits(game.betAmount);

  return (
    <React.Fragment>
      <ListItem className={styles.container}>
        <ListItemAvatar>
          <Avatar>
            {game.finished ? (
              <WalletIcon fontSize="large" />
            ) : (
              <MoneyIcon className={styles.moneyIcon} fontSize="large" />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${formattedBetAmount} eth`} secondary={secondaryText} />
        {!imGambler && !game.finished ? (
          <ListItemSecondaryAction>
            <IconButton onClick={play} edge="end" aria-label="play">
              <PlayIcon />
            </IconButton>
          </ListItemSecondaryAction>
        ) : null}
      </ListItem>
    </React.Fragment>
  );
};
