import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import type { ICocktail } from "../../../types";
import { apiUrl } from "../../../globalConstants.ts";
import React from "react";
import { Link } from "react-router-dom";
import LocalBarIcon from "@mui/icons-material/LocalBar";

interface Props {
  cocktail: ICocktail;
}

const CocktailItem: React.FC<Props> = ({ cocktail }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 2,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.001)",
          cursor: "pointer",
        },
      }}
    >
      <CardActionArea component={Link} to={"/" + cocktail._id}>
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: "primary.main" }}>
              {cocktail.user.avatar ? cocktail.user.avatar : null}
            </Avatar>
          }
          title={
            <Typography variant="h6" component="div" fontWeight="bold">
              {cocktail.name}
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary">
              Created by: {cocktail.user.email}
            </Typography>
          }
          sx={{
            pb: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />

        <CardMedia
          component="img"
          height="300"
          image={apiUrl + "/" + cocktail.image}
          alt={cocktail.name}
          sx={{
            objectFit: "cover",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />

        <CardContent sx={{ pt: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocalBarIcon fontSize="small" />
            Ingredients:
          </Typography>
          <List>
            {cocktail.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <Typography variant="body1">
                  <Box component="span" fontWeight="bold">
                    {ingredient.name}
                  </Box>{" "}
                  - {ingredient.amount}
                </Typography>
              </ListItem>
            ))}
          </List>
          {!cocktail.isPublished && (
            <Typography variant="body2" color="textSecondary">
              under consideration by the administration
            </Typography>
          )}
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          component={Link}
          to={"/" + cocktail._id}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 2,
            py: 0.5,
          }}
        >
          View more
        </Button>
      </CardActions>
    </Card>
  );
};

export default CocktailItem;
