const express = require('express');
const router = express.Router();

const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles
} = require('../controller/articleControllers');

const requireAuth = require("../middleware/requireAuth");

// Public article routes
router.get('/', getAllArticles);
router.get('/search', searchArticles);
router.get('/:id', getArticleById);

// Protected article routes (JWT required)
router.post('/', requireAuth, createArticle);
router.put('/:id', requireAuth, updateArticle);
router.delete('/:id', requireAuth, deleteArticle);

module.exports = router;