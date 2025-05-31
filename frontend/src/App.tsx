import "./App.css";
import { Container, CssBaseline, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import Cocktails from "./features/cocktails/Cocktails.tsx";
import CocktailFullView from "./features/cocktails/CocktailFullView.tsx";
import ProtectedRoute from "./components/UI/ProtectedRoute.tsx";
import { useAppSelector } from "./app/hooks.ts";
import { selectUser } from "./features/users/usersSlice.ts";
import MyCocktails from "./features/cocktails/MyCocktails.tsx";
import NewCocktail from "./features/cocktails/NewCoktail.tsx";
import AdminLayout from "./features/admin/AdminLayout.tsx";
import AdminCocktails from "./features/admin/cocktails/AdminCocktails.tsx";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <ToastContainer autoClose={500} />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Cocktails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/:id" element={<CocktailFullView />} />

            <Route
              path="/my-cocktails"
              element={
                <ProtectedRoute isAllowed={Boolean(user)}>
                  <MyCocktails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-cocktail"
              element={
                <ProtectedRoute isAllowed={Boolean(user)}>
                  <NewCocktail />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin"
              element={
                <ProtectedRoute isAllowed={user && user.role === "admin"}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="" element={""} />
              <Route path="cocktails" element={<AdminCocktails />} />
            </Route>

            <Route
              path="*"
              element={<Typography variant="h4">Not found page</Typography>}
            />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
