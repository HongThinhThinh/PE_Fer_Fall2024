import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
function Header() {
  return (
    <AppBar position="static" sx={{ textAlign: "center" }} color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit">
            <Link className="link" to="/">
              HOME
            </Link>
          </Button>
          <Button color="inherit">
            <Link className="link" to="/dungltSE170484">
              Art Tools
            </Link>
          </Button>
          <Button color="inherit">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
