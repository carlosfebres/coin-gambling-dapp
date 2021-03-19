import React, { useEffect } from "react";
import { GamesList } from "../../components/Tournaments/GamesList";
import { CreateGameForm } from "../../components/Tournaments/CreateGameForm";
import { useRootSelector } from "../../store/utils";
import { getGameAddresses } from "../../store/Game/game.selectors";
import { useDispatch } from "react-redux";
import { fetchGameAddresses } from "../../store/Game/game.slide";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    backgroundColor: "rgba(0,0,0,.1)",
    padding: 32,
  },
});

export const HomePage = () => {
  const classes = useStyles();

  const gameAddresses = useRootSelector(getGameAddresses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGameAddresses());
  }, []);

  return (
    <Container maxWidth="md" className={classes.container}>
      <CreateGameForm />
      <div style={{ marginTop: 16 }}>
        <GamesList gameAddress={gameAddresses} />
      </div>
    </Container>
  );
};
