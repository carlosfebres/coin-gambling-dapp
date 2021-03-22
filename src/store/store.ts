import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { gamblerMiddleware } from "./Gambler/gambler.middleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamblerMiddleware),
});
