import Grid from "@mui/material/Grid";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <Grid container direction="column">
      <Grid>
        <Typography variant="h4">Admin menu</Typography>
      </Grid>

      <Grid>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/cocktails">
              <ListItemText primary="Cocktails" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default AdminMenu;
