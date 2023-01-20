const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
