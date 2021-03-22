import React, { useEffect } from "react";
import { Game } from "../../store/Game/game.models";
import { useDispatch } from "react-redux";
import { fetchGameByAddress } from "../../store/Game/game.slide";
import { useRootSelector } from "../../store/utils";
import { getGameByAddress } from "../../store/Game/game.selectors";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { useGameContract } from "../../hooks/useGameContract";
import { getGamblerAddress } from "../../store/Gambler/gambler.selector";
import { useGameListener } from "../../hooks/useGameListeners";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";

type GameProps = {
  address: Game["address"];
};

const person =
  "https://banner2.cleanpng.com/20181231/fta/kisspng-computer-icons-user-profile-portable-network-graph-circle-svg-png-icon-free-download-5-4714-onli-5c2a3809d6e8e6.1821006915462707298803.jpg";

export const GameItem: React.FC<GameProps> = ({ address }) => {
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

  const secondaryText = game.finished ? `Game won by: ${game.winner}` : `Game started  by: ${game.player1}`;

  return (
    <React.Fragment>
      <ListItem>
        <ListItemAvatar>
          {game.finished ? (
            <WalletIcon fontSize="large" />
          ) : (
            <MoneyIcon style={{ color: "rgb(50,205,50)" }} fontSize="large" />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={`${game.bitAmount} wei`}
          secondary={secondaryText}
        />
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
