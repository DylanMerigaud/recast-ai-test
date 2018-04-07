import React from "react";
import { withStyles } from "material-ui/styles";
import Input from "material-ui/Input";
import MdImage from "react-icons/lib/md/image";

const styles = theme => ({
  root: {
    padding: "6px",
    backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid black"
  },
  imageIcon: {
    width: "1.5rem",
    height: "1.5rem",
    paddingLeft: "6px"
  }
});

function UserInput(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Input multiline fullWidth placeholder="Type a message..." />
      <MdImage className={classes.imageIcon} />
    </div>
  );
}

export default withStyles(styles)(UserInput);
