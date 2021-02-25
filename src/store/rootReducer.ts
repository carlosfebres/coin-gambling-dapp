import {combineReducers} from "redux";
import {gameReducer} from "./Game/game.slide";
import {tournamentsReducer} from "./Tournaments/tournaments.slide";

export const rootReducer = combineReducers({
  game: gameReducer,
  tournaments: tournamentsReducer,
});
