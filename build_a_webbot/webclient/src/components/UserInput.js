import React from "react";
import { withStyles } from "material-ui/styles";
import Input from "material-ui/Input";
import IconButton from "material-ui/IconButton";
import MdImage from "react-icons/lib/md/image";
import MdLightbulbOutline from "react-icons/lib/md/lightbulb-outline";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    padding: "6px",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    alignItems: "center",
    borderTop: `1px solid ${theme.palette.divider}`
  },
  input: {
    flexGrow: "1"
  }
});

function UserInput(props) {
  const { classes, changeTheme } = props;

  return (
    <div className={classes.root}>
      <Input
        className={classes.input}
        multiline
        fullWidth
        placeholder="Type a message..."
      />
      <IconButton>
        <MdImage />
      </IconButton>
      <IconButton>
        <MdLightbulbOutline onClick={changeTheme} />
      </IconButton>
    </div>
  );
}

UserInput.propTypes = {
  classes: PropTypes.object,
  changeTheme: PropTypes.func
};

UserInput.defaultProps = {
  changeTheme: () => console.log("changed Theme.")
};

export default withStyles(styles)(UserInput);
