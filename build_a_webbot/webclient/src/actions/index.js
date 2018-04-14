export const SET_SOCKET = "INIT_SOCKET";
export const AN_ERROR_OCCURED = "AN_ERROR_OCCURED";

export const setSocket = socket => ({
  type: SET_SOCKET,
  socket
});
export const anErrorOccured = () => ({
  type: AN_ERROR_OCCURED
});

export const RETRIEVE_CONVERSATION_DONE = "RETRIEVE_CONVERSATION_DONE";

export const retrieveConversationDone = conversation => ({
  type: RETRIEVE_CONVERSATION_DONE,
  conversation
});

export const SEND_USER_MESSAGE = "SEND_USER_MESSAGE";
export const SEND_USER_MESSAGE_DONE = "SEND_USER_MESSAGE_DONE";
export const BOT_IS_THINKING = "BOT_IS_THINKING";
export const BOT_IS_THINKING_DONE = "BOT_IS_THINKING_DONE";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const sendUserMessage = (message, typeMessage = "text") => ({
  type: SEND_USER_MESSAGE,
  message,
  typeMessage
});
export const sendUserMessageDone = message => ({
  type: SEND_USER_MESSAGE_DONE,
  message
});
export const botIsThinking = () => ({
  type: BOT_IS_THINKING
});
export const botIsThinkingDone = () => ({
  type: BOT_IS_THINKING_DONE
});
export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const CHANGE_MESSAGE_INPUT = "CHANGE_MESSAGE_INPUT";
export const CHANGE_CONVERSATION_RETRIEVE_VALUE =
  "CHANGE_CONVERSATION_RETRIEVE_VALUE";
export const SUBMIT_CONVERSATION_RETRIEVE_VALUE =
  "SUBMIT_CONVERSATION_RETRIEVE_VALUE";

export const changeMessageInput = value => ({
  type: CHANGE_MESSAGE_INPUT,
  value
});
export const changeConversationRetrieveValue = value => ({
  type: CHANGE_CONVERSATION_RETRIEVE_VALUE,
  value
});
export const submitConversationRetrieveValue = () => ({
  type: SUBMIT_CONVERSATION_RETRIEVE_VALUE
});

export const SWITCH_THEME = "SWITCH_THEME";

export const switchTheme = () => ({
  type: SWITCH_THEME
});
