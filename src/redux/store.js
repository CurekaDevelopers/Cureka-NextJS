"use client"; // Ensures this runs only on the client side

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

// "use client"; // Ensures this runs only on the client side

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // localStorage (default)
// import storageSession from "redux-persist/lib/storage/session"; // sessionStorage
// import { createIndexedDBStorage } from "redux-persist-indexeddb-storage"; // IndexedDB for larger data
// import adminSlice, { adminSliceName } from "./slices/admin.slice";
// import authReducer, { authSliceName } from "./slices/auth.slice";
// import commonReducer, { commonSliceName } from "./slices/common.slice";
// import customerReducer, { customerSliceName } from "./slices/customer.slice";

// // 🛠 Fix for SSR: Prevent errors in Next.js due to window undefined
// const createNoopStorage = () => ({
//   getItem: () => Promise.resolve(null),
//   setItem: () => Promise.resolve(),
//   removeItem: () => Promise.resolve(),
// });

// // 🛠 Function to dynamically select storage based on the slice name
// const getStorage = (sliceName) => {
//   if (typeof window === "undefined") return createNoopStorage(); // SSR-safe

//   switch (sliceName) {
//     case authSliceName:
//       return storageSession; // Auth data should be cleared on browser close
//     case customerSliceName:
//       return storage; // Customer data should persist across sessions
//     case adminSliceName:
//     case commonSliceName:
//       return createIndexedDBStorage({
//         dbName: "myAppDB",
//         storeName: sliceName,
//       }); // Store large admin/common data in IndexedDB
//     default:
//       return storage; // Default fallback to localStorage
//   }
// };

// // 🛠 Create persist configurations for each slice
// const persistConfig = {
//   key: "root",
//   storage: getStorage(authSliceName), // Using sessionStorage for auth
//   whitelist: [
//     authSliceName,
//     customerSliceName,
//     adminSliceName,
//     commonSliceName,
//   ], // Persist all slices
// };

// const rootReducer = combineReducers({
//   [commonSliceName]: commonReducer,
//   [adminSliceName]: adminSlice,
//   [authSliceName]: authReducer,
//   [customerSliceName]: customerReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // 🛠 Create the Redux store
// export const makeStore = () =>
//   configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }),
//   });

// export const store = makeStore();
// export const persistor = persistStore(store);
