import type { GlobalError, ICocktail, ValidationError } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAdminCocktail,
  fetchAdminCocktails,
  togglePublishedAdminCocktail,
} from "./cocktailsAdminThunks.ts";

interface AdminCocktailsState {
  items: ICocktail[];
  loading: boolean;
  error: ValidationError | GlobalError | null;
}

export const selectAdminCocktails = (state: {
  adminCocktails: AdminCocktailsState;
}) => state.adminCocktails.items;
export const selectAdminLoading = (state: {
  adminCocktails: AdminCocktailsState;
}) => state.adminCocktails.loading;
export const selectAdminError = (state: {
  adminCocktails: AdminCocktailsState;
}) => state.adminCocktails.error;

const initialState: AdminCocktailsState = {
  items: [],
  loading: false,
  error: null,
};

const adminCocktailsSlice = createSlice({
  name: "adminCocktails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminCocktails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAdminCocktails.fulfilled,
        (state, { payload: cocktails }) => {
          state.loading = false;
          state.items = cocktails;
        },
      )
      .addCase(fetchAdminCocktails.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      })

      .addCase(deleteAdminCocktail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdminCocktail.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (cock) => cock._id !== action.payload.id,
        );
      })
      .addCase(deleteAdminCocktail.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      })

      .addCase(togglePublishedAdminCocktail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        togglePublishedAdminCocktail.fulfilled,
        (state, { payload: oneCocktail }) => {
          state.loading = false;
          const idx = state.items.findIndex(
            (cock) => cock._id === oneCocktail._id,
          );
          if (idx !== -1) {
            state.items[idx] = oneCocktail;
          }
        },
      )
      .addCase(
        togglePublishedAdminCocktail.rejected,
        (state, { payload: error }) => {
          state.loading = false;
          state.error = error || null;
        },
      );
  },
});

export const adminCocktailsReducer = adminCocktailsSlice.reducer;
