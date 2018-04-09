import React from "react";
import { withStyles } from "material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import Chat from "containers/Chat";
import UserInput from "components/UserInput";
import grey from "material-ui/colors/grey";
import blue from "material-ui/colors/blue";
import orange from "material-ui/colors/orange";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    background: {
      paper: grey[200],
      userMessage: blue[200],
      pendingMessage: orange[200]
    }
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      userMessage: blue[500],
      pendingMessage: orange[500]
    }
  }
});

function App({
  classes,
  theme,
  changeMessageInput,
  messageInput,
  changeTheme,
  sendMessage,
  botIsThinking
}) {
  return (
    <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <div className={classes.root}>
        <Chat botIsThinking={botIsThinking} />
        <UserInput
          changeTheme={changeTheme}
          changeMessageInput={changeMessageInput}
          messageInput={messageInput}
          sendMessage={sendMessage}
        />
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  changeMessageInput: PropTypes.func,
  changeTheme: PropTypes.func,
  sendMessage: PropTypes.func,
  botIsThinking: PropTypes.bool
};

App.defaultProps = {
  theme: "light",
  changeMessageInput: () => {
    console.log("Change input.");
  },
  changeTheme: () => {
    console.log("Change theme.");
  },
  sendMessage: () => {
    console.log("Send message.");
  },
  botIsThinking: false
};

export default withStyles(styles)(App);
