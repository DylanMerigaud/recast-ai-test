import React from "react";
import { withStyles } from "material-ui/styles";
import Input from "material-ui/Input";
import IconButton from "material-ui/IconButton";
// import MdImage from "react-icons/lib/md/image";
import MdLightbulbOutline from "react-icons/lib/md/lightbulb-outline";
import MdSend from "react-icons/lib/md/send";
import PropTypes from "prop-types";

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

function handleOnSubmit(e, sendMessage) {
  e.preventDefault();
  sendMessage();
}

function UserInput({
  classes,
  changeMessageInput,
  messageInput,
  changeTheme,
  sendMessage
}) {
  return (
    <form
      onSubmit={e => handleOnSubmit(e, sendMessage)}
      className={classes.root}
    >
      <Input
        className={classes.input}
        disableUnderline
        placeholder="Type a message..."
        onChange={e => changeMessageInput(e.target.value)}
        value={messageInput}
      />
      <IconButton disabled={messageInput === ""} type="submit">
        <MdSend />
      </IconButton>
      {
        //   <IconButton>
        //   <MdImage />
        // </IconButton>
      }
      <IconButton>
        <MdLightbulbOutline onClick={changeTheme} />
      </IconButton>
    </form>
  );
}

UserInput.propTypes = {
  classes: PropTypes.object,
  changeMessageInput: PropTypes.func,
  changeTheme: PropTypes.func,
  sendMessage: PropTypes.func,
  messageInput: PropTypes.string
};

UserInput.defaultProps = {
  changeMessageInput: () => console.log("input changed."),
  changeTheme: () => console.log("changed Theme."),
  sendMessage: () => console.log("send message."),
  messageInput: ""
};

export default withStyles(styles)(UserInput);
