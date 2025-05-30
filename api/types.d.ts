export interface UserFields {
  email: string;
  password: string;
  refreshToken: string;
  role: "admin" | "user";
  __confirmPassword: string;
  displayName: string;
  googleID?: string;
  avatar: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface CocktailMutation {
  user: string;
  name: string;
  image: string | null;
  recipe: string | null;
  ingredients: Ingredient[];
}
