import React from "react";
import { Grid } from "@mui/material";
import type { ICocktail } from "../../../types";
import CocktailItem from "./CocktailItem.tsx";

interface Props {
  cocktails: ICocktail[];
}

const CocktailList: React.FC<Props> = ({ cocktails }) => {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 5 }}>
      {cocktails.map((cocktailOne) => (
        <Grid key={cocktailOne._id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <CocktailItem cocktail={cocktailOne} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CocktailList;
