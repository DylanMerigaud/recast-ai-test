import socketIOClient from "socket.io-client";

export default function initSocket({
  anErrorOccured,
  retrieveConversationDone,
  sendUserMessageDone,
  botIsThinking,
  botIsThinkingDone,
  receiveMessage
}) {
  const socket = socketIOClient(
    process.env.NODE_ENV === "production"
      ? "https://recast-ai-test.herokuapp.com/"
      : "http://localhost:3000/"
  );

  socket.on("anErrorOccured", () => {
    anErrorOccured();
  });
  socket.on("retrieveConversationDone", conversation => {
    retrieveConversationDone(conversation);
  });
  socket.on("sendUserMessageDone", message => {
    sendUserMessageDone(message);
  });
  socket.on("botIsThinking", () => {
    botIsThinking();
  });
  socket.on("botIsThinkingDone", () => {
    botIsThinkingDone();
  });
  socket.on("receiveMessage", message => {
    receiveMessage(message);
  });

  return socket;
}
