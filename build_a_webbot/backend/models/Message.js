var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  content: String,
  origin: String,
  type: String
});

module.exports = mongoose.model("Message", messageSchema);
