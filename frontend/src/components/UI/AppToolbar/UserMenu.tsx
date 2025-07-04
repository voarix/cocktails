import React, { useState } from "react";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import type { User } from "../../../types";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks.ts";
import { logout } from "../../../features/users/usersThunks.ts";
import {
  unsetAccessToken,
  unsetUser,
} from "../../../features/users/usersSlice.ts";
import { toast } from "react-toastify";
import { apiUrl } from "../../../globalConstants.ts";
import { fetchAllCocktails } from "../../../features/cocktails/cocktailsThunks.ts";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const handeClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserOptionsEl(event.currentTarget);
  };

  const handleClose = () => {
    setUserOptionsEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      dispatch(unsetUser());
      dispatch(unsetAccessToken());
      navigate("/");
      await dispatch(fetchAllCocktails());
      toast.success("Logout is successful");
    } catch (e) {
      toast.error("Logout is failed");
      console.error(e);
    }
  };

  const avatarUrl = (path: string) => {
    if (!path) {
      return "/default.jpg";
    }

    if (path.startsWith("http") || path.startsWith("https")) {
      return path;
    }

    return `${apiUrl}/${path}`;
  };

  return (
    <>
      <Link
        to="/my-cocktails"
        style={{
          color: "white",
          textDecoration: "none",
          marginLeft: "6px",
          fontWeight: 500,
        }}
      >
        My Cocktails
      </Link>
      <Link
        to="/add-cocktail"
        style={{
          color: "white",
          textDecoration: "none",
          marginLeft: "6px",
          fontWeight: 500,
        }}
      >
        New Cocktail
      </Link>
      <Button onClick={handeClick} color="inherit">
        Hello, {user.displayName}
        {user.avatar && (
          <Avatar
            src={avatarUrl(user.avatar)}
            alt={user.displayName}
            sx={{ ml: 2 }}
          />
        )}
      </Button>
      <Menu
        keepMounted
        anchorEl={userOptionsEl}
        open={!!userOptionsEl}
        onClose={handleClose}
      >
        <MenuItem>
          <Button onClick={handleLogout}>Log Out</Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
