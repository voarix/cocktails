import { createAsyncThunk } from "@reduxjs/toolkit";

import { isAxiosError } from "axios";
import type { GlobalError, ICocktail, ValidationError } from "../../../types";
import axiosApi from "../../../axiosApi.ts";

export const fetchAdminCocktails = createAsyncThunk<
  ICocktail[],
  void,
  { rejectValue: ValidationError }
>("adminCocktails/fetchAdminCocktails", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<ICocktail[]>("/admin/cocktails", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return rejectWithValue(error.response.data as ValidationError);
    }
    throw error;
  }
});

export const deleteAdminCocktail = createAsyncThunk<
  { message: string; id: string },
  string,
  { rejectValue: ValidationError | GlobalError }
>("adminCocktails/deleteAdminCocktail", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApi.delete<{ message: string }>(
      `/admin/cocktails/${id}`,
      { withCredentials: true },
    );
    return { message: response.data.message, id };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 400 || error.response.status === 404) {
        return rejectWithValue(error.response.data);
      }
    }
    throw error;
  }
});

export const togglePublishedAdminCocktail = createAsyncThunk<
  ICocktail,
  string,
  { rejectValue: ValidationError | GlobalError }
>(
  "adminCocktails/togglePublishedAdminCocktail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch<ICocktail>(
        `/admin/cocktails/${id}/togglePublished`,
        {},
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          return rejectWithValue(error.response.data);
        }
      }
      throw error;
    }
  },
);
