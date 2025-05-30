import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCocktails, selectFetchError, selectFetchLoading, } from "./cocktailsSlice.ts";
import { useEffect } from "react";
import { fetchAllCocktails } from "./cocktailsThunks.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { Box, Typography } from "@mui/material";
import CocktailList from "./components/CocktailList.tsx";

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const errorCocktails = useAppSelector(selectFetchError);
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchAllCocktails());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (errorCocktails) {
    return <h1>Error. Please try again later. ({errorCocktails.message})</h1>;
  }

  return (
    <>
      <Box sx={{ mt: 7 }}>
        {cocktails.length > 0 ? (
          <CocktailList cocktails={cocktails} />
        ) : (
          <Typography variant="body2">No cocktails yet</Typography>
        )}
      </Box>
    </>
  );
};

export default Cocktails;
