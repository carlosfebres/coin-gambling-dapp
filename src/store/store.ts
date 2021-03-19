import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { gamesMiddleware } from "./Game/game.middleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamesMiddleware),
});
