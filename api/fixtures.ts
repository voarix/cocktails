import mongoose from "mongoose";
import config from "./config";
import User, { generateRefreshToken } from "./models/User";
import Cocktail from "./models/Cocktail";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("cocktails");
    await db.dropCollection("users");
  } catch (error) {
    console.log("Collections were not present, skipping drop");
  }

  const john = new User({
    email: "john@gmail.com",
    password: "123",
    displayName: "John",
    avatar: "default.jpg",
    confirmPassword: "123",
    role: "user",
  });

  john.refreshToken = generateRefreshToken(john);
  await john.save();

  const jane = new User({
    email: "jane@gmail.com",
    password: "123",
    displayName: "Jane",
    avatar: "default.jpg",
    confirmPassword: "123",
    role: "admin",
  });

  jane.refreshToken = generateRefreshToken(jane);
  await jane.save();

  const bob = new User({
    email: "bob@gmail.com",
    password: "123",
    displayName: "Bob",
    avatar: "default.jpg",
    confirmPassword: "123",
    role: "user",
  });

  bob.refreshToken = generateRefreshToken(bob);
  await bob.save();

  await Cocktail.create([
    {
      user: john._id,
      name: "John's moji",
      image: "fixtures/mojito.jpg",
      recipe: "Classic mojito recipe skj;fljsa s jasjfa",
      isPublished: true,
      ingredients: [
        {name: "Milk mouse", amount: "50ml"},
        {name: "Lime of shit", amount: "30ml"}
      ],
      ratings: [
        {user: jane._id, stars: 5},
        {user: bob._id, stars: 4}
      ]
    },
    {
      user: john._id,
      name: "John's Marga",
      image: "fixtures/margarita.jpg",
      recipe: "Classic margarita recipe sfkjas; jf.",
      isPublished: true,
      ingredients: [
        {name: "Tequila", amount: "50ml"},
        {name: "Triple sec", amount: "20ml"}
      ],
      ratings: [
        {user: jane._id, stars: 3},
        {user: bob._id, stars: 5}
      ]
    },
    {
      user: john._id,
      name: "John's Secret",
      image: "fixtures/secret.jpg",
      recipe: "Secret j;slkfap jfs;fjsaf",
      isPublished: false,
      ingredients: [
        {name: "Vodka", amount: "50ml"},
        {name: "Something", amount: "20ml"}
      ],
      ratings: [
        {user: jane._id, stars: 2}
      ]
    },

    {
      user: jane._id,
      name: "Jane's Cosmo",
      image: "fixtures/cosmo.jpg",
      recipe: "s;aldjf;sajf jsfj ;asljf jas;fj asfje...",
      isPublished: true,
      ingredients: [
        {name: "Vodka", amount: "40ml"},
        {name: "Triple sec", amount: "15ml"}
      ],
      ratings: [
        {user: john._id, stars: 4},
        {user: bob._id, stars: 5}
      ]
    },
    {
      user: jane._id,
      name: "Negroni",
      image: "fixtures/negroni.jpg",
      recipe: "Classic negroni recipe asfj sl;f s;lfkj safj sfjskjfjsfjasj sfsl o.",
      isPublished: true,
      ingredients: [
        {name: "Gin", amount: "30ml"},
        {name: "Campari", amount: "30ml"}
      ],
      ratings: [
        {user: john._id, stars: 5},
        {user: bob._id, stars: 3}
      ]
    },
    {
      user: jane._id,
      name: "Jane's Exper",
      image: "fixtures/experemental.jpg",
      recipe: "Experimental recipe is ;sjdfjsf; jsjf ;asj fs.",
      isPublished: false,
      ingredients: [
        {name: "Rum", amount: "50ml"},
        {name: "Herbs", amount: "5g"}
      ],
      ratings: [
        {user: bob._id, stars: 1}
      ]
    },

    {
      user: bob._id,
      name: "Bob's Old",
      image: "fixtures/old-fashioned.jpg",
      recipe: "Classic old fashioned recipe s;fj;sl...",
      isPublished: true,
      ingredients: [
        {name: "Bourbon", amount: "60ml"},
        {name: "Sugar", amount: "1 cube"}
      ],
      ratings: [
        {user: john._id, stars: 5},
        {user: jane._id, stars: 4}
      ]
    },
    {
      user: bob._id,
      name: "Bob's Daiquiri",
      image: "fixtures/daiquiri.jpg",
      recipe: "Classic daiquiri recipe...",
      isPublished: true,
      ingredients: [
        {name: "Rum", amount: "60ml"},
        {name: "Lime juice", amount: "30ml"}
      ],
      ratings: [
        {user: john._id, stars: 4},
        {user: jane._id, stars: 3}
      ]
    },
    {
      user: bob._id,
      name: "Bob's Failed",
      image: "fixtures/failed.jpg",
      recipe: "Failed experiment...",
      isPublished: false,
      ingredients: [
        {name: "Whiskey", amount: "50ml"},
        {name: "Tabasco", amount: "10ml"}
      ],
      ratings: [
        {user: jane._id, stars: 1}
      ]
    }
  ]);


  await db.close();
};

run().catch(console.error);