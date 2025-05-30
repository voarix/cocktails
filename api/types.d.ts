export interface UserFields {
  email: string;
  password: string;
  refreshToken: string;
  role: string;
  __confirmPassword: string;
  displayName: string;
  googleID?: string;
  avatar: string;
}

export interface CocktailMutation {
  user: string;
  name: string;
  image: string | null;
  recipe: string | null;
  ingredients: string[];
}
