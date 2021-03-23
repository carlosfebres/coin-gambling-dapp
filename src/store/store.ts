import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { gamblerMiddleware } from "./Gambler/gambler.middleware";
import { dialogMiddleware } from "./Dialogs/dialog.middleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamblerMiddleware, dialogMiddleware),
});
