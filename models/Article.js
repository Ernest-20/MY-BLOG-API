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
  }
}, {
  timestamps: true
});

// Bonsu Search
articleSchema.index({
    title: 'text',
    content: 'text',
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;