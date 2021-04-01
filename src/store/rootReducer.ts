import { combineReducers } from "redux";
import { gameReducer } from "./Game/game.slice";
import { dialogsReducer } from "./Dialogs/dialogs.slice";
import { gamblerReducer } from "./Gambler/gambler.slice";

export const rootReducer = combineReducers({
  game: gameReducer,
  gambler: gamblerReducer,
  dialogs: dialogsReducer,
});
