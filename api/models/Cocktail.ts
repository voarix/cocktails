import mongoose from "mongoose";

const CocktailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: String,
  recipe: {
    type: String,
    required: [true, "Recipe is required"],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: [true, "Ingredient name is required"],
      },
      amount: {
        type: String,
        required: [true, "Ingredient amount is required"],
      },
    },
  ],
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
  ],
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
export default Cocktail;
