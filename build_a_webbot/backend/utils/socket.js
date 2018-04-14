const socketIO = require("socket.io");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const recastai = require("recastai");
const winston = require('winston');

const recastaiBuild = new recastai.build(
  "9cc2a415845ac7420286ef20a2901ad0",
  "en"
);

function errorHandler(err, socket) {
  socket.emit("anErrorOccured");
  winston.error(err.stack)
}

function WelcomeMessage(conversationID) {
  return new Message({ content: `<span>Welcome !<br/>You can check out the GitHub repository <a href="https://github.com/dylanleking/recast-ai-test">here</a>.<br/>Try to type something in english.<br/>I recommend you to backup the following ID in order to share or to have the same conversation across devices.<span class="copy-to-clipboard-welcomeMessage">${conversationID}</span></span>`, type: 'html', origin: 'welcomeMessage' })
}

function ErrorLoadingConversationMessage() {
  return new Message({ content: "I'm sorry but your conversation seems to be no longer available, let's create another one.", type: 'text', origin: 'error' })
}

function initSocket(server) {
  const io = socketIO(server);
  io.on("connection", socket => {
    socket.on("retrieveConversation", conversationID => {
      if (conversationID)
        Conversation.findOne({ _id: conversationID })
          .populate("messages")
          .exec((err, conversationFound) => {
            if (err) return errorHandler(err, socket);
            if (conversationFound) {
              socket.join(conversationFound._id)
              socket.emit("retrieveConversationDone", conversationFound);
            }
            else {
              socket.emit(
                "receiveMessage",
                new ErrorLoadingConversationMessage()
              );
              const newConversationAfterFail = new Conversation();
              const welcomeMessage = new WelcomeMessage(newConversationAfterFail._id);
              newConversationAfterFail.messages.push(welcomeMessage);
              welcomeMessage.save(err => {
                if (err) return errorHandler(err, socket);
                newConversationAfterFail.save(err => {
                  if (err) return errorHandler(err, socket);
                  socket.join(newConversationAfterFail._id)
                  socket.emit(
                    "retrieveConversationDone",
                    newConversationAfterFail
                  );
                });
              });
            }
          });
      else {
        const newConversation = new Conversation();
        const welcomeMessage = new WelcomeMessage(newConversation._id);
        newConversation.messages.push(welcomeMessage);
        welcomeMessage.save(err => {
          if (err) return errorHandler(err, socket);
          newConversation.save(err => {
            if (err) return errorHandler(err, socket);
            socket.join(newConversation._id)
            socket.emit("retrieveConversationDone", newConversation);
          });
        });
      }
    });

    socket.on("sendUserMessage", ({ message, conversationID }) => {
      if (!message || !message.tempId || !message.content || !message.type) return;
      const { content, tempId, type } = message;
      const messageFromUser = new Message({ content, origin: "user", type: type === 'text' || type === 'image' ? type : 'text' });
      Conversation.findOne(
        { _id: conversationID },
        (err, conversationFound) => {
          if (err || !conversationFound) return errorHandler(err, socket);
          conversationFound.messages.push(messageFromUser);
          messageFromUser.save(err => {
            if (err) return errorHandler(err, socket);
          conversationFound.save(err => {
            if (err) return errorHandler(err, socket);
            io.to(conversationID).emit(
              "sendUserMessageDone",
              Object.assign({}, messageFromUser.toObject(), { tempId })
            );
            io.to(conversationID).emit("botIsThinking");
            recastaiBuild
              .dialog(
                { type: "text", content: messageFromUser.content },
                { conversationId: conversationID }
              )
              .then(function (res) {
                io.to(conversationID).emit("botIsThinkingDone");
                if (
                  res.messages.length < 1)
                  return;
                const messageFromBot = new Message({
                  content: res.messages[0].content,
                  origin: "bot",
                  type: res.messages[0].type
                });
                conversationFound.messages.push(messageFromBot);
                messageFromBot.save(err => {
                  if (err) return errorHandler(err, socket);
                conversationFound.save(err => {
                  if (err) return errorHandler(err, socket);
                  io.to(conversationID).emit(
                    "receiveMessage",
                    messageFromBot.toObject()
                  );
                })
              });
            })
            .catch(err => errorHandler(err, socket));
          }
          );
        });
        });
    });
    socket.on("disconnect", () => { });
  });
}

module.exports = initSocket;
