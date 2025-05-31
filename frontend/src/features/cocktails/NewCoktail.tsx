import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCocktail } from "./cocktailsThunks";
import { selectCreateError, selectCreateLoading } from "./cocktailsSlice";
import type { CocktailMutation } from "../../types";
import FileInput from "../../components/UI/FileInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Ingredient {
  name: string;
  amount: string;
}

interface CocktailFormInputs {
  name: string;
  recipe: string;
  image: File | null;
  ingredients: Ingredient[];
}

const NewCocktail = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCreateLoading);
  const error = useAppSelector(selectCreateError);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CocktailFormInputs>({
    defaultValues: {
      name: "",
      recipe: "",
      image: null,
      ingredients: [{ name: "", amount: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data: CocktailFormInputs) => {
    const cocktailToAdd: CocktailMutation = {
      name: data.name,
      recipe: data.recipe,
      ingredients: data.ingredients,
      image: data.image ?? null,
    };

    try {
      await dispatch(createCocktail(cocktailToAdd)).unwrap();
      toast.success("You have successfully added!");
      navigate("/");
    } catch (e) {
      toast.error("Error adding cocktail");
      console.error(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Cocktail
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Cocktail Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Recipe"
            multiline
            rows={4}
            fullWidth
            error={!!errors.recipe}
            helperText={errors.recipe?.message}
            {...register("recipe", { required: "Recipe is required" })}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field }) => (
              <FileInput
                name="image"
                label="Image"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  field.onChange(file);
                }}
                errors={!!errors.image}
                helperText={errors.image?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h6">Ingredients</Typography>
          {fields.map((field, index) => (
            <Grid container spacing={1} key={field.id} sx={{ mb: 1 }}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Name"
                  fullWidth
                  {...register(`ingredients.${index}.name`, {
                    required: "Ingredient name required",
                  })}
                  error={!!errors.ingredients?.[index]?.name}
                  helperText={errors.ingredients?.[index]?.name?.message}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Amount"
                  fullWidth
                  {...register(`ingredients.${index}.amount`, {
                    required: "Amount required",
                  })}
                  error={!!errors.ingredients?.[index]?.amount}
                  helperText={errors.ingredients?.[index]?.amount?.message}
                />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ textAlign: "right" }}>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => remove(index)}
                  size="small"
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}

          <Button
            variant="outlined"
            onClick={() => append({ name: "", amount: "" })}
          >
            Add Ingredient
          </Button>
        </Grid>

        <Grid size={{ xs: 12 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" fullWidth>
              Create
            </Button>
          )}
        </Grid>

        {error && (
          <Grid size={{ xs: 12 }}>
            <Typography color="error">{JSON.stringify(error)}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default NewCocktail;
