import React, { Component } from "react";
import { connect } from "react-redux";
import initSocket from "utils/socket";
import App from "components/App";
import PropTypes from "prop-types";
import {
  setSocket,
  anErrorOccured,
  retrieveConversationDone,
  sendUserMessage,
  sendUserMessageDone,
  botIsThinking,
  botIsThinkingDone,
  receiveMessage,
  changeMessageInput
} from "actions";
import { switchTheme } from "actions";

class Root extends Component {
  componentDidMount() {
    const {
      setSocket,
      anErrorOccured,
      retrieveConversationDone,
      sendUserMessageDone,
      botIsThinking,
      botIsThinkingDone,
      receiveMessage
    } = this.props;
    setSocket(
      initSocket(
        anErrorOccured,
        retrieveConversationDone,
        sendUserMessageDone,
        botIsThinking,
        botIsThinkingDone,
        receiveMessage
      )
    );
  }

  render() {
    const {
      botIsThinkingBool,
      changeTheme,
      theme,
      messageInput,
      changeMessageInput,
      sendUserMessage
    } = this.props;
    return (
      <App
        botIsThinking={botIsThinkingBool}
        changeTheme={changeTheme}
        theme={theme}
        changeMessageInput={changeMessageInput}
        messageInput={messageInput}
        sendMessage={sendUserMessage}
      />
    );
  }
}

Root.propTypes = {
  messages: PropTypes.array,
  botIsThinkingBool: PropTypes.bool,
  changeTheme: PropTypes.func,
  theme: PropTypes.string,
  messageInput: PropTypes.string,
  changeMessageInput: PropTypes.func,
  sendUserMessage: PropTypes.func
};

function mapStateToProps(state) {
  return {
    messageInput: state.chat.messageInput,
    theme: state.user.theme,
    botIsThinkingBool: state.chat.botIsThinking
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTheme: () => {
      dispatch(switchTheme());
    },
    setSocket: socket => {
      dispatch(setSocket(socket));
    },
    anErrorOccured: () => {
      dispatch(anErrorOccured());
    },
    retrieveConversationDone: conversation => {
      dispatch(retrieveConversationDone(conversation));
    },
    sendUserMessage: () => {
      dispatch(sendUserMessage());
    },
    sendUserMessageDone: message => {
      dispatch(sendUserMessageDone(message));
    },
    botIsThinking: () => {
      dispatch(botIsThinking());
    },
    botIsThinkingDone: () => {
      dispatch(botIsThinkingDone());
    },
    receiveMessage: message => {
      dispatch(receiveMessage(message));
    },
    changeMessageInput: value => {
      dispatch(changeMessageInput(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
