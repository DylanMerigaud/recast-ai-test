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
  CHANGE_CONVERSATION_RETRIEVE_VALUE,
  SUBMIT_CONVERSATION_RETRIEVE_VALUE,
  RESET_CONVERSATION,
  SWITCH_THEME,
  TOGGLE_SHOW_MORE_BUTTONS
} from "actions";

import Cookies from "js-cookie";
import shortid from "shortid";
import { combineReducers } from "redux";

const initialChatState = {
  conversationID: Cookies.get("conversationID") || null,
  conversationLoading: false,
  messages: [],
  botIsThinking: false,
  error: false,
  messageInput: "",
  conversationRetrieveValue: "",
  socket: null
};

const chat = (state = initialChatState, action) => {
  const { type, conversation, message, socket, value, typeMessage } = action;
  if (type === SET_SOCKET) {
    if (state.conversationID !== null) {
      socket.emit("retrieveConversation", state.conversationID);
      return Object.assign({}, state, { socket, conversationLoading: true });
    } else {
      return Object.assign({}, state, { socket });
    }
  } else if (type === AN_ERROR_OCCURED) {
    //Cookies.remove("conversationID");
    return Object.assign({}, state, { error: true });
  } else if (type === RETRIEVE_CONVERSATION_DONE) {
    Cookies.set("conversationID", conversation._id);
    const newMessages = state.messages.concat(conversation.messages);
    return Object.assign({}, state, {
      conversationID: conversation._id,
      messages: newMessages
    });
  } else if (type === SEND_USER_MESSAGE) {
    const message = {
      content: state.messageInput,
      tempId: shortid.generate(),
      origin: "user",
      type: typeMessage
    };
    const newMessages = state.messages.slice();
    newMessages.push(message);
    state.socket.emit("sendUserMessage", {
      message,
      conversationID: state.conversationID
    });
    return Object.assign({}, state, {
      messages: newMessages,
      messageInput: ""
    });
  } else if (type === SEND_USER_MESSAGE_DONE) {
    const newMessages = state.messages.slice();
    const existingMessageIndex = newMessages.findIndex(
      x => x.tempId === message.tempId
    );
    if (existingMessageIndex !== -1) {
      delete newMessages[existingMessageIndex].tempId;
      newMessages[existingMessageIndex]._id = message._id;
    } else {
      delete message.tempId;
      newMessages.push(message);
    }
    return Object.assign({}, state, {
      messages: newMessages
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
  } else if (type === CHANGE_CONVERSATION_RETRIEVE_VALUE) {
    return Object.assign({}, state, { conversationRetrieveValue: value });
  } else if (type === SUBMIT_CONVERSATION_RETRIEVE_VALUE) {
    state.socket.emit("retrieveConversation", state.conversationRetrieveValue);
  } else if (type === RESET_CONVERSATION) {
    Cookies.remove("conversationID");
    return Object.assign({}, initialChatState, {
      conversationID: null,
      socket: state.socket
    });
  }
  return state;
};

const initialUserState = {
  theme: Cookies.get("theme") || "light",
  showMoreButtons: false
};

const user = (state = initialUserState, action) => {
  const { type } = action;
  if (type === SWITCH_THEME) {
    const newTheme = state.theme === "dark" ? "light" : "dark";
    Cookies.set("theme", newTheme);
    return Object.assign({}, state, { theme: newTheme });
  } else if (type === TOGGLE_SHOW_MORE_BUTTONS) {
    return Object.assign({}, state, {
      showMoreButtons: !state.showMoreButtons
    });
  }
  return state;
};

const rootReducer = combineReducers({
  chat,
  user
});

export default rootReducer;
