import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectCocktails,
  selectFetchError,
  selectFetchLoading,
} from "./cocktailsSlice.ts";
import { useEffect } from "react";
import { fetchAllCocktails } from "./cocktailsThunks.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { Box, Button, Grid, Typography } from "@mui/material";
import CocktailList from "./components/CocktailList.tsx";
import { selectUser } from "../users/usersSlice.ts";
import { Link } from "react-router-dom";

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const errorCocktails = useAppSelector(selectFetchError);
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectFetchLoading);
  const user = useAppSelector(selectUser);

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
      <Grid>
        {user && user.role === "admin" ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "purple",
              "&:hover": {
                backgroundColor: "#eee",
              },
              mt: 2,
            }}
            component={Link}
            to="/admin/cocktails"
          >
            Admin page
          </Button>
        ) : (
          ""
        )}
      </Grid>

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
