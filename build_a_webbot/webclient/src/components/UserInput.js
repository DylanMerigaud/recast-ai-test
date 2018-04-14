import React from "react";
import { withStyles } from "material-ui/styles";
import Input from "material-ui/Input";
import IconButton from "material-ui/IconButton";
// import MdImage from "react-icons/lib/md/image";
import Settings from "@material-ui/icons/Settings";
import Send from "@material-ui/icons/Send";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    position: "relative",
    minHeight: "48px",
    padding: "6px",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    alignItems: "center",
    borderTop: `1px solid ${theme.palette.divider}`
  },
  input: {
    flexGrow: "1"
  },
  moreButtons: {
    display: "flex",
    flexDirection: "column-reverse",
    backgroundColor: theme.palette.background.moreButtons,
    position: "absolute",
    right: "0px",
    bottom: "100%"
  }
});

function UserInput({
  classes,
  onChange,
  value,
  onSubmit,
  onSettings,
  showMoreButtons,
  children
}) {
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
      <div>
        <IconButton disabled={value === ""} type="submit">
          <Send />
        </IconButton>
      </div>
      {
        //   <IconButton>
        //   <MdImage />
        // </IconButton>
      }
      <IconButton onClick={onSettings}>
        <Settings />
      </IconButton>
      {showMoreButtons && <div className={classes.moreButtons}>{children}</div>}
    </form>
  );
}

UserInput.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  showMoreButtons: PropTypes.bool.isRequired,
  children: PropTypes.object
};

UserInput.defaultProps = {
  children: []
};

export default withStyles(styles)(UserInput);
