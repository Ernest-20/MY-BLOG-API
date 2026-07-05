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

// search (place before :id)
router.get('/search', searchArticles);

// CRUD routes
router.get('/', getAllArticles);

router.get('/:id', getArticleById);

router.post('/', createArticle);

router.put('/:id', updateArticle);

router.delete('/:id', deleteArticle);

module.exports = router;