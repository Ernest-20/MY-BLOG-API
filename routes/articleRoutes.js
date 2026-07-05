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

// CRUD routes
router.get('/', getAllArticles);

// search must come before /:id
router.get('/', getAllArticles);
router.get('/search', searchArticles);

router.get('/:id', getArticleById);

router.post('/', createArticle);

router.put('/:id', updateArticle);

router.delete('/:id', deleteArticle);

module.exports = router;