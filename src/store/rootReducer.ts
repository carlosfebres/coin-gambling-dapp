import { combineReducers } from "redux";
import { gameReducer } from "./Game/game.slide";
import { dialogsReducer } from "./Dialogs/dialogs.slide";
import { gamblerReducer } from "./Gambler/gambler.slide";

export const rootReducer = combineReducers({
  game: gameReducer,
  gambler: gamblerReducer,
  dialogs: dialogsReducer,
});
