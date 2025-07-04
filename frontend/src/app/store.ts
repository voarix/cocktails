import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { usersReducer } from "../features/users/usersSlice.ts";
import { cocktailsReducer } from "../features/cocktails/cocktailsSlice.ts";
import { adminCocktailsReducer } from "../features/admin/cocktails/cocktailsAdminSlice.ts";

const usersPersistConfig = {
  key: "store:users",
  storage,
  whitelist: ["user", "accessToken"],
};

const rootReducer = combineReducers({
  cocktails: cocktailsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  adminCocktails: adminCocktailsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
