import React from "react";
import { withStyles } from "material-ui/styles";
import UserInput from "components/UserInput";
import Conversation from "components/Conversation";

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

function App(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Conversation />
      <UserInput />
    </div>
  );
}

export default withStyles(styles)(App);
