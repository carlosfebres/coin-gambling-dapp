import { combineReducers } from "redux";
import { gameReducer } from "./Game/game.slide";
import { tournamentsReducer } from "./Tournaments/tournaments.slide";
import { dialogsReducer } from "./Dialogs/dialogs.slide";

export const rootReducer = combineReducers({
  game: gameReducer,
  tournaments: tournamentsReducer,
  dialogs: dialogsReducer,
});
