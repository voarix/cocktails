import { Error } from "mongoose";
import express from "express";
import Cocktail from "../../models/Cocktail";

const cocktailsAdminRouter = express.Router();

cocktailsAdminRouter.get("/", async (_req, res, next) => {
  try {
    const cocktails = await Cocktail.find();
    res.send(cocktails);
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send(error);
      return;
    }

    next(error);
  }
});

cocktailsAdminRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const cocktail = await Cocktail.findByIdAndDelete(id);
    if (!cocktail) {
      res.status(404).send({ error: "Cocktail not found" });
      return;
    }

    res.send({ message: "Cocktail deleted successfully" });
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({ error: "Invalid id " });
      return;
    }

    next(error);
  }
});

cocktailsAdminRouter.patch("/:id/togglePublished", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ error: "Cocktail id must be in req params" });
      return;
    }

    const cocktail = await Cocktail.findById(id);
    if (!cocktail) {
      res.status(404).send({ error: "Cocktail not found" });
      return;
    }

    const newCocktail = !cocktail.isPublished;
    const updateCocktail = await Cocktail.findByIdAndUpdate(
      id,
      { isPublished: newCocktail },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(updateCocktail);
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({ error: "Invalid id " });
      return;
    }
    next(error);
  }
});

export default cocktailsAdminRouter;
