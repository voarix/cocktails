import React from "react";
import { Grid } from "@mui/material";
import type { ICocktail } from "../../../types";
import CocktailItem from "./CocktailItem.tsx";

interface Props {
  cocktails: ICocktail[];
}

const CocktailList: React.FC<Props> = ({ cocktails }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 5 }}>
      {cocktails.map((cocktailOne) => (
        <CocktailItem cocktail={cocktailOne} />
      ))}
    </Grid>
  );
};

export default CocktailList;
