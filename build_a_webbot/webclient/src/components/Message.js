import React from "react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    backgroundColor: "green",
    borderRadius: "25px",
    padding: "6px 8px 6px 8px",
    margin: "6px 0 6px 0"
  }
});

function Message(props) {
  const { classes, value, origin } = props;
  console.log(origin);
  return (
    <div
      style={{ alignSelf: origin === "bot" ? "flex-start" : "flex-end" }}
      className={classes.root}
    >
      {value}
    </div>
  );
}

export default withStyles(styles)(Message);
