import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {store} from "./store";

export type RootState = ReturnType<typeof store.getState>;

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => typeof store.dispatch = useDispatch;

