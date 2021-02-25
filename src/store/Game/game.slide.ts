import {Dispatch} from 'redux';
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../utils";
import {gameReducerInitialState, GameStatus} from "./game.models";

export const gameSlide = createSlice({
  name: 'game',
  initialState: gameReducerInitialState,
  reducers: {
    startGame(state) {
      state.state = GameStatus.Started;
    },
    endGame(state) {
      state.state = GameStatus.Ended;
    }
  },
});

const {actions, reducer} = gameSlide;
const {endGame, startGame} = actions;

const toggleGame = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const {game} = getState();
    if (game.state === GameStatus.Started)
      return dispatch(endGame());
    else
      return dispatch(startGame())
  };
};

export {reducer as gameReducer};
export {startGame, endGame, toggleGame};
