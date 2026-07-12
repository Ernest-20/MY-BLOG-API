const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }

}, {
  timestamps: true
});

// Bonsu Search
articleSchema.index({
    title: 'text',
    content: 'text',
});

module.exports = mongoose.model("Article",articleSchema);