var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  text: String,
  image: String,
  origin: String
});

module.exports = mongoose.model("Message", messageSchema);