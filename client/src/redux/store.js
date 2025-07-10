import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { env } from "../config/env.config";
import adminSlice, { adminSliceName } from "./slices/admin.slice";
import authReducer, { authSliceName } from "./slices/auth.slice";
import commonReducer, { commonSliceName } from "./slices/common.slice";
import customerReducer, { customerSliceName } from "./slices/customer.slice";

const rootReducer = combineReducers({
  [commonSliceName]: commonReducer,
  [adminSliceName]: adminSlice,
  [authSliceName]: authReducer,
  [customerSliceName]: customerReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [authSliceName],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: env.REACT_ENV === "development",
});

export const persistor = persistStore(store);

export const { dispatch } = store;

export default store;
