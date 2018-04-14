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
  changeMessageInput,
  changeConversationRetrieveValue,
  submitConversationRetrieveValue,
  resetConversation,
  toggleShowMoreButtons
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
      initSocket({
        anErrorOccured,
        retrieveConversationDone,
        sendUserMessageDone,
        botIsThinking,
        botIsThinkingDone,
        receiveMessage
      })
    );
  }

  render() {
    return <App {...this.props} />;
  }
}

Root.propTypes = {
  botIsCurrentlyThinking: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  messageInput: PropTypes.string.isRequired,
  changeMessageInput: PropTypes.func.isRequired,
  conversationRetrieveValue: PropTypes.string.isRequired,
  changeConversationRetrieveValue: PropTypes.func.isRequired,
  sendUserMessage: PropTypes.func.isRequired,
  submitConversationRetrieveValue: PropTypes.func.isRequired,
  alreadyHaveAConversation: PropTypes.bool.isRequired,
  resetConversation: PropTypes.func.isRequired,
  toggleShowMoreButtons: PropTypes.func.isRequired,
  showMoreButtons: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    messageInput: state.chat.messageInput,
    conversationRetrieveValue: state.chat.conversationRetrieveValue,
    theme: state.user.theme,
    botIsCurrentlyThinking: state.chat.botIsThinking,
    alreadyHaveAConversation: state.chat.conversationID !== null,
    showMoreButtons: state.user.showMoreButtons
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
    },
    changeConversationRetrieveValue: value => {
      dispatch(changeConversationRetrieveValue(value));
    },
    submitConversationRetrieveValue: () => {
      dispatch(submitConversationRetrieveValue());
    },
    resetConversation: () => {
      dispatch(resetConversation());
    },
    toggleShowMoreButtons: () => {
      dispatch(toggleShowMoreButtons());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
