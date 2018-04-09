var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
});

module.exports = mongoose.model("Conversation", conversationSchema);
