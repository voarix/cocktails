import express from "express";
import Cocktail from "../models/Cocktail";
import { Error } from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";
import { CocktailMutation } from "../types";
import jwt from "jsonwebtoken";
import User, { JWT_SECRET } from "../models/User";
import { cocktailImage } from "../middleware/multer";

const cocktailsRouter = express.Router();

cocktailsRouter.get("/", async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    let user = null;

    if (token && authHeader) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };
        user = await User.findById(decoded._id);

        if (user) {
          const isPublishedCocktails = await Cocktail.find({
            isPublished: true,
          });

          const cocktails = await Cocktail.find({
            user: user._id,
            isPublished: false,
          });

          cocktails.push(...isPublishedCocktails);
          res.send(cocktails);
          return;
        }
      } catch {
        const cocktails = await Cocktail.find({ isPublished: true }).populate(
          "user",
          "email avatar",
        );
        res.send(cocktails);
        return;
      }
    }

    const cocktails = await Cocktail.find({ isPublished: true }).populate(
      "user",
      "email",
    );
    res.send(cocktails);
  } catch (e) {
    next(e);
  }
});

cocktailsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const cocktail = await Cocktail.findById(id).populate("user", "email avatar");
    if (!cocktail) {
      res.status(404).send({ error: "Cocktail not found" });
      return;
    }

    res.send(cocktail);
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    next(error);
  }
});

cocktailsRouter.post(
  "/",
  auth,
  cocktailImage.single("image"),
  async (req, res, next) => {
    try {
      const user = (req as RequestWithUser).user;

      let ingredients = req.body.ingredients;
      if (typeof ingredients === "string") {
        ingredients = JSON.parse(ingredients);
      }

      const newCocktail: CocktailMutation = {
        user: String(user._id),
        name: req.body.name,
        image: req.file ? "cocktails/" + req.file.filename : "/default.jpg",
        recipe: req.body.recipe,
        ingredients,
      };

      const cocktail = new Cocktail(newCocktail);
      await cocktail.save();
      res.send(cocktail);
    } catch (error) {
      if (
        error instanceof Error.ValidationError ||
        error instanceof Error.CastError
      ) {
        res.status(400).send(error);
        return;
      }
      next(error);
    }
  },
);

export default cocktailsRouter;
