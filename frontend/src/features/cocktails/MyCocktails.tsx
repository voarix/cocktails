import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { selectCocktails, selectFetchLoading } from "./cocktailsSlice.ts";
import { fetchMyCocktails } from "./cocktailsThunks.ts";
import CocktailList from "./components/CocktailList.tsx";

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchMyCocktails());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        My Cocktails
      </Typography>
      {loading ? <CircularProgress /> : <CocktailList cocktails={cocktails} />}
    </Grid>
  );
};

export default MyCocktails;
