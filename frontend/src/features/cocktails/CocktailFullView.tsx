import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectFetchOneError,
  selectFetchOneLoading,
  selectOneCocktail,
} from "./cocktailsSlice.ts";
import { useEffect } from "react";
import { fetchCocktailById } from "./cocktailsThunks.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { Box, Container, Paper, Typography } from "@mui/material";
import { apiUrl } from "../../globalConstants.ts";

const CocktailFullView = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector(selectOneCocktail);
  const loading = useAppSelector(selectFetchOneLoading);
  const error = useAppSelector(selectFetchOneError);

  useEffect(() => {
    if (id) {
      dispatch(fetchCocktailById(id));
    }
  }, [dispatch, id]);

  if (loading) return <Spinner />;
  if (!cocktail) return <Typography>No cocktail found</Typography>;

  if (error) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {"errors" in error ? error.message : error.error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          {cocktail.name}
        </Typography>

        <Box
          component="img"
          src={`${apiUrl}/${cocktail.image}`}
          alt={cocktail.name}
          sx={{
            width: "100%",
            maxHeight: 400,
            objectFit: "cover",
            borderRadius: 2,
            mb: 3,
          }}
        />

        <Typography variant="h5" gutterBottom>
          Ingredients:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          {cocktail.ingredients.map((ingredient, index) => (
            <li key={index}>
              <Typography>
                {ingredient.name} — {ingredient.amount}
              </Typography>
            </li>
          ))}
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Recipe:
        </Typography>
        <Typography>{cocktail.recipe}</Typography>

        {cocktail.user && (
          <Typography variant="body2" sx={{ mt: 3, fontStyle: "italic" }}>
            Created by: {cocktail.user.email}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default CocktailFullView;
