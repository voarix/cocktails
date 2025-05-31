import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { GlobalError, ICocktail, ValidationError } from "../../types";
import { createCocktail, fetchAllCocktails, fetchCocktailById, fetchMyCocktails, } from "./cocktailsThunks.ts";

interface CocktailsState {
  items: ICocktail[];
  fetchLoading: boolean;
  error: ValidationError | null;

  oneItem: ICocktail | null;
  fetchOneLoading: boolean;
  fetchOneError: GlobalError | null | ValidationError;

  createLoading: boolean;
  createError: GlobalError | null | ValidationError;
}

export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectFetchLoading = (state: RootState) =>
  state.cocktails.fetchLoading;
export const selectFetchError = (state: RootState) => state.cocktails.error;

export const selectFetchOneLoading = (state: RootState) =>
  state.cocktails.fetchOneLoading;
export const selectOneCocktail = (state: RootState) => state.cocktails.oneItem;
export const selectFetchOneError = (state: RootState) =>
  state.cocktails.fetchOneError;

export const selectCreateLoading = (state: RootState) =>
  state.cocktails.createLoading;
export const selectCreateError = (state: RootState) =>
  state.cocktails.createError;

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
  error: null,

  oneItem: null,
  fetchOneLoading: false,
  fetchOneError: null,

  createLoading: false,
  createError: null,
};

const cocktailsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCocktails.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCocktails.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchAllCocktails.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.error = error || null;
      })

      .addCase(fetchCocktailById.pending, (state) => {
        state.fetchOneLoading = true;
        state.fetchOneError = null;
      })
      .addCase(fetchCocktailById.fulfilled, (state, { payload }) => {
        state.fetchOneLoading = false;
        state.oneItem = payload;
      })
      .addCase(fetchCocktailById.rejected, (state, { payload: error }) => {
        state.fetchOneLoading = false;
        state.fetchOneError = error || null;
      })

      .addCase(fetchMyCocktails.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchMyCocktails.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchMyCocktails.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.error = error || null;
      })


      .addCase(createCocktail.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createCocktail.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCocktail.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
      });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
