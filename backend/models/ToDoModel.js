const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  name:{ type: String, required: true }, 
  task: { type: String, required: true }, 
  iscompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("ToDo", toDoSchema);