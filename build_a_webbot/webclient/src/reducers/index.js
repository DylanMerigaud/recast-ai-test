import {
  SET_SOCKET,
  AN_ERROR_OCCURED,
  RETRIEVE_CONVERSATION_DONE,
  SEND_USER_MESSAGE,
  SEND_USER_MESSAGE_DONE,
  BOT_IS_THINKING,
  BOT_IS_THINKING_DONE,
  RECEIVE_MESSAGE,
  CHANGE_MESSAGE_INPUT,
  SWITCH_THEME
} from "actions";

import Cookies from "js-cookie";
import shortid from "shortid";
import { combineReducers } from "redux";
import { getNewArrayWithoutFirstMatching } from "utils/helper";

const initialChatState = {
  conversationID: Cookies.get("conversationID") || null,
  conversationLoading: false,
  messages: [],
  pendingMessages: [],
  botIsThinking: false,
  error: false,
  messageInput: ""
};

const chat = (state = initialChatState, action) => {
  const { type, conversation, message, socket, value } = action;
  if (type === SET_SOCKET) {
    socket.emit("retrieveConversation", state.conversationID);
    return Object.assign({}, state, { socket, conversationLoading: true });
  } else if (type === AN_ERROR_OCCURED) {
    Cookies.remove("conversationID");
    return Object.assign({}, state, { error: true });
  } else if (type === RETRIEVE_CONVERSATION_DONE) {
    Cookies.set("conversationID", conversation._id);
    return Object.assign({}, state, {
      conversationID: conversation._id,
      messages: conversation.messages
    });
  } else if (type === SEND_USER_MESSAGE) {
    const message = {
      text: state.messageInput,
      tempId: shortid.generate(),
      origin: "user"
    };
    const newpendingMessages = state.pendingMessages.slice();
    newpendingMessages.push(message);
    state.socket.emit("sendUserMessage", {
      message,
      conversationID: state.conversationID
    });
    return Object.assign({}, state, {
      pendingMessages: newpendingMessages,
      messageInput: ""
    });
  } else if (type === SEND_USER_MESSAGE_DONE) {
    const newPendingMessages = getNewArrayWithoutFirstMatching(
      state.pendingMessages,
      x => x.tempId === message.tempId
    );
    const newMessages = state.messages.slice();
    delete message.tempId;
    newMessages.push(message);
    return Object.assign({}, state, {
      messages: newMessages,
      pendingMessages: newPendingMessages
    });
  } else if (type === BOT_IS_THINKING) {
    return Object.assign({}, state, { botIsThinking: true });
  } else if (type === BOT_IS_THINKING_DONE) {
    return Object.assign({}, state, { botIsThinking: false });
  } else if (type === RECEIVE_MESSAGE) {
    const newMessages = state.messages.slice();
    newMessages.push(message);
    return Object.assign({}, state, { messages: newMessages });
  } else if (type === CHANGE_MESSAGE_INPUT) {
    return Object.assign({}, state, { messageInput: value });
  }
  return state;
};

const initialUserState = {
  theme: Cookies.get("theme") || "light"
};

const user = (state = initialUserState, action) => {
  const { type } = action;
  if (type === SWITCH_THEME) {
    const newTheme = state.theme === "dark" ? "light" : "dark";
    Cookies.set("theme", newTheme);
    return Object.assign({}, state, { theme: newTheme });
  }
  return state;
};

const rootReducer = combineReducers({
  chat,
  user
});

export default rootReducer;
