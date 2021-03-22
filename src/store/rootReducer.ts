import { combineReducers } from "redux";
import { gameReducer } from "./Game/game.slide";
import { casinoReducer } from "./Casino/casino.slide";
import { dialogsReducer } from "./Dialogs/dialogs.slide";
import { gamblerReducer } from "./Gambler/gambler.slide";

export const rootReducer = combineReducers({
  casino: casinoReducer,
  game: gameReducer,
  gambler: gamblerReducer,
  dialogs: dialogsReducer,
});
