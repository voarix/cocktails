import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import type { CocktailMutation, GlobalError, ICocktail, ValidationError, } from "../../types";

export const fetchAllCocktails = createAsyncThunk<
  ICocktail[],
  void,
  { rejectValue: ValidationError }
>("cocktails/fetchAllCocktails", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<ICocktail[]>("/cocktails", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const fetchCocktailById = createAsyncThunk<
  ICocktail,
  string,
  { rejectValue: ValidationError }
>("cocktails/fetchCocktailById", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<ICocktail>(`/cocktails/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data as ValidationError);
    }
    throw error;
  }
});

export const fetchMyCocktails = createAsyncThunk<
  ICocktail[],
  void,
  { rejectValue: ValidationError }
>("cocktails/fetchMyCocktails", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<ICocktail[]>("/cocktails/my", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const createCocktail = createAsyncThunk<
  ICocktail,
  CocktailMutation,
  { rejectValue: ValidationError | GlobalError}
>("cocktails/createCocktail", async (cocktailToAdd, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(cocktailToAdd) as (keyof CocktailMutation)[];

    keys.forEach((key) => {
      const value = cocktailToAdd[key];
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    const response = await axiosApi.post<ICocktail>("/cocktails", formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data);
      }
    }
    throw error;
  }
});
