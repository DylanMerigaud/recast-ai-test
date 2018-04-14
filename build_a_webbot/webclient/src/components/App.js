import React from "react";
import { withStyles } from "material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import Chat from "containers/Chat";
import DialogConversationRetrieve from "components/DialogConversationRetrieve";
import UserInput from "components/UserInput";
import grey from "material-ui/colors/grey";
import blue from "material-ui/colors/blue";
import orange from "material-ui/colors/orange";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: "150px",
    maxHeight: "100%",
    width: "100%",
    minWidth: "300px",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    background: {
      serverMessage: grey[200],
      userMessage: blue[200],
      copyToClipboard: grey[300],
      pendingMessage: orange[200]
    },
    scrollBar: grey[400]
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      serverMessage: grey[500],
      userMessage: blue[500],
      copyToClipboard: grey[600],
      pendingMessage: orange[500]
    },
    scrollBar: grey[100]
  }
});

function App({
  classes,
  theme,
  changeMessageInput,
  changeConversationRetrieveValue,
  conversationRetrieveValue,
  messageInput,
  changeTheme,
  sendMessage,
  submitConversationRetrieveValue,
  botIsThinking,
  alreadyHaveAConversation
}) {
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;
  return (
    <MuiThemeProvider theme={currentTheme}>
      <div className={classes.root}>
        <Chat botIsThinking={botIsThinking} />
        <UserInput
          changeTheme={changeTheme}
          onChange={changeMessageInput}
          value={messageInput}
          onSubmit={sendMessage}
        />
        <DialogConversationRetrieve
          onChange={changeConversationRetrieveValue}
          value={conversationRetrieveValue}
          onSubmit={submitConversationRetrieveValue}
          open={!alreadyHaveAConversation}
        />
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  changeMessageInput: PropTypes.func.isRequired,
  messageInput: PropTypes.string.isRequired,
  conversationRetrieveValue: PropTypes.string.isRequired,
  changeConversationRetrieveValue: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  submitConversationRetrieveValue: PropTypes.func.isRequired,
  botIsThinking: PropTypes.bool.isRequired,
  alreadyHaveAConversation: PropTypes.bool.isRequired
};

App.defaultProps = {
  theme: "light"
};

export default withStyles(styles)(App);
