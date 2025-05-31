import React, { useEffect } from "react";
import { deleteAdminCocktail, fetchAdminCocktails, togglePublishedAdminCocktail, } from "./cocktailsAdminThunks";

import { Box, IconButton, List, ListItem, ListItemText, Typography, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectAdminCocktails, selectAdminError, selectAdminLoading, } from "./cocktailsAdminSlice.ts";
import { toast } from "react-toastify";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";

const AdminCocktails: React.FC = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectAdminCocktails);
  const loading = useAppSelector(selectAdminLoading);
  const error = useAppSelector(selectAdminError);

  useEffect(() => {
    dispatch(fetchAdminCocktails());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this cocktail?")) {
      try {
        dispatch(deleteAdminCocktail(id)).unwrap();
        toast.success("Cocktails deleted!");
      } catch (e) {
        toast.error("Cocktails not deleted!");
        console.error(e);
      }
    }
  };

  const handleTogglePublished = (id: string) => {
    try {
      dispatch(togglePublishedAdminCocktail(id));
    } catch (e) {
      toast.error("Cocktails not published");
      console.error(e);
    }
  };

  if (loading) return <Spinner />;
  if (error) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {"errors" in error ? error.message : error.error}
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <List>
        {cocktails.map((cocktail) => {
          return (
            <ListItem
              key={cocktail._id}
              secondaryAction={
                <>
                  <IconButton
                    sx={{border: "1px solid"}}
                    aria-label="toggle-published"
                    onClick={() => handleTogglePublished(cocktail._id)}
                    title={cocktail.isPublished ? "Unpublish" : "Publish"}
                  >
                    {cocktail.isPublished ? (
                      <ToggleOnIcon color="success" />
                    ) : (
                      <ToggleOffIcon color="disabled" />
                    )}
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(cocktail._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={cocktail.name}
                secondary={`Published: ${cocktail.isPublished ? "Yes" : "No"}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default AdminCocktails;
