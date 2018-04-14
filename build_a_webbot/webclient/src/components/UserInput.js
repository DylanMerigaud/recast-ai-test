import React from "react";
import { withStyles } from "material-ui/styles";
import Input from "material-ui/Input";
import IconButton from "material-ui/IconButton";
// import MdImage from "react-icons/lib/md/image";
import LightbulbOutline from "@material-ui/icons/LightbulbOutline";
import Send from "@material-ui/icons/Send";
import PropTypes from "prop-types";
import Tooltip from "material-ui/Tooltip";

const styles = theme => ({
  root: {
    minHeight: "48px",
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

function UserInput({ classes, onChange, value, changeTheme, onSubmit }) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      className={classes.root}
    >
      <Input
        className={classes.input}
        disableUnderline
        placeholder="Type a message..."
        onChange={e => onChange(e.target.value)}
        value={value}
      />
      <Tooltip title="Send the message.">
        <div>
          <IconButton disabled={value === ""} type="submit">
            <Send />
          </IconButton>
        </div>
      </Tooltip>
      {
        //   <IconButton>
        //   <MdImage />
        // </IconButton>
      }
      <Tooltip title="Change the theme.">
        <IconButton>
          <LightbulbOutline onClick={changeTheme} />
        </IconButton>
      </Tooltip>
    </form>
  );
}

UserInput.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(UserInput);
