import Accessibility from "@mui/icons-material/Accessibility";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
const TopBar = (props) => {
  // eslint-disable-next-line react/prop-types
  const onIconClicked = () => props.viewDialog(); // notify the parent
  return (
    <AppBar color="secondary" style={{ marginBottom: "5vh" }}>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Chat it Up! - Info3139
        </Typography>
        <section style={{ height: 70, width: 70, marginLeft: "auto" }}>
          <IconButton onClick={onIconClicked}>
            <Accessibility style={{ color: "white", height: 60, width: 60 }} />
          </IconButton>
        </section>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
