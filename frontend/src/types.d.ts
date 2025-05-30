export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
  googleId?: string;
  avatar?: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Rating {
  user: string;
  stars: number;
}

export interface ICocktail {
  _id: string;
  name: string;
  user: {
    _id: string;
    email: string;
    avatar: string;
  };
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[];
  rating: Rating[];
}

export interface CocktailMutation {
  name: string;
  image?: File | null;
  recipe: string;
  ingredients: Ingredient[];
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  confirmPassword: string;
  avatar?: File | null;
}

export interface GlobalError {
  error: string;
}
