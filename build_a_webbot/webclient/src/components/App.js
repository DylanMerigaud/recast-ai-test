import React from 'react';
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Chat from 'containers/Chat';
import DialogConversationRetrieve from 'components/dialogs/DialogConversationRetrieve';
import SettingsButtons from 'components/inputs/SettingsButtons';
import UserInput from 'components/inputs/UserInput';
import grey from 'material-ui/colors/grey';
import blue from 'material-ui/colors/blue';
import orange from 'material-ui/colors/orange';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    height: '100%',
    minHeight: '150px',
    maxHeight: '100%',
    width: '100%',
    minWidth: '300px',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      serverMessage: grey[200],
      userMessage: blue[200],
      pendingMessage: orange[200],
      moreButtons: grey[400],
    },
    scrollBarThumb: grey[400],
    copyToClipboard: grey[400],
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      serverMessage: grey[500],
      userMessage: blue[500],
      pendingMessage: orange[500],
      moreButtons: grey[700],
    },
    scrollBarThumb: grey[100],
    copyToClipboard: grey[600],
  },
});

function App({
  classes,
  theme,
  changeMessageInput,
  changeConversationRetrieveValue,
  conversationRetrieveValue,
  messageInput,
  changeTheme,
  sendUserMessage,
  submitConversationRetrieveValue,
  botIsCurrentlyThinking,
  alreadyHaveAConversation,
  resetConversation,
  toggleShowMoreButtons,
  showMoreButtons,
  conversationID,
}) {
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  return (
    <MuiThemeProvider theme={currentTheme}>
      <div className={classes.root}>
        <Chat botIsThinking={botIsCurrentlyThinking} />
        <UserInput
          changeTheme={changeTheme}
          onChange={changeMessageInput}
          value={messageInput}
          onSubmit={sendUserMessage}
          showMoreButtons={showMoreButtons}
          onSettings={toggleShowMoreButtons}
          resetConversation={resetConversation}
        >
          <SettingsButtons
            changeTheme={changeTheme}
            resetConversation={resetConversation}
            conversationID={conversationID}
          />
        </UserInput>
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
  sendUserMessage: PropTypes.func.isRequired,
  submitConversationRetrieveValue: PropTypes.func.isRequired,
  botIsCurrentlyThinking: PropTypes.bool.isRequired,
  alreadyHaveAConversation: PropTypes.bool.isRequired,
  toggleShowMoreButtons: PropTypes.func.isRequired,
  showMoreButtons: PropTypes.bool.isRequired,
  conversationID: PropTypes.string,
};

export default withStyles(styles)(App);
