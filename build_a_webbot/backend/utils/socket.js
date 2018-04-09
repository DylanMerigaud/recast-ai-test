const socketIO = require("socket.io");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const recastai = require('recastai')

const recastaiBuild  = new recastai.build('9cc2a415845ac7420286ef20a2901ad0', 'en')

function initSocket(server) {
  const io = socketIO(server);
  io.on("connection", socket => {
    socket.on("retrieveConversation", conversationID => {
      if (conversationID)
        Conversation.findOne({ _id: conversationID })
          .populate("messages")
          .exec((err, conversation) => {
            if (err) return socket.emit("anErrorOccured");
            else {
              if (conversation)
                socket.emit(
                  "retrieveConversationDone",
                  conversation
                );
              else {
                const newConversationAfterFail = new Conversation();
                newConversationAfterFail.save(err => {
                  if (err) return socket.emit("anErrorOccured");
                 socket.emit(
                      "retrieveConversationDone",
                      newConversationAfterFail
                    );
                });
              }
            }
          });
      else {
        const newConversation = new Conversation();
        newConversation.save(err => {
          if (err) return socket.emit("anErrorOccured");
         socket.emit("retrieveConversationDone", newConversation);
        });
      }
    });

    socket.on("sendUserMessage", ({message, conversationID}) => {
      if (!message||!message.tempId||!message.text)
      return ;
      const {text, tempId} = message
      const messageFromUser = new Message({text, origin: 'user'});
      messageFromUser.save(err=>{
        if (err) return socket.emit("anErrorOccured");
        Conversation.findOne({_id: conversationID},(err, conversationFound) => {
          if (err||!conversationFound) return socket.emit("anErrorOccured");
          conversationFound.messages.push(messageFromUser)
        conversationFound.save(err=>{      
        socket.emit("sendUserMessageDone", Object.assign({}, messageFromUser.toObject(), {tempId}));
        socket.emit("botIsThinking");
        recastaiBuild.dialog({ type: 'text', content: messageFromUser.text}, { conversationId: conversationID})
  .then(function(res) {
    socket.emit("botIsThinkingDone");
    if (res.messages.length < 1 || res.messages.type !== 'text')
    return ;
    const messageFromBot = new Message({text: res.messages[0].content, origin: 'bot'});
    messageFromBot.save(err=>{
      if (err) return socket.emit("anErrorOccured");
      Conversation.findOne({_id: conversationID},(err, conversationFound) => {
          if (err||!conversationFound) return socket.emit("anErrorOccured");
          conversationFound.messages.push(messageFromBot)
        conversationFound.save(err=>{     
          if (err) return socket.emit("anErrorOccured"); 
      socket.emit("receiveMessage", messageFromBot.toObject());
        })
      })
    })
    
  })
  .catch((err) => console.log(err))
      })
      })
    })
    });

    // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
    });
  });
}

module.exports = initSocket;
