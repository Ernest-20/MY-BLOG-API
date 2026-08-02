const Joi = require("joi");
const Article = require("../models/Article");

// Joi validation
const articleSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().required(),
    author: Joi.string().required()
});

// Get All
exports.getAllArticles = async (req, res, next) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        next(error);
    }
};

// Get One
exports.getArticleById = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }

        res.json(article);

    } catch (error) {
        next(error);
    }
};


// Create Article
exports.createArticle = async (req, res, next) => {
    try {

        const { error } = articleSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }


        const article = await Article.create({
            ...req.body,
            userId: req.user._id
        });


        res.status(201).json(article);

    } catch (error) {
        next(error);
    }
};



// Update Article (Ownership Protected)
exports.updateArticle = async (req, res, next) => {

    try {

        const { error } = articleSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }


        const article = await Article.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user._id
            },
            req.body,
            {
                new: true
            }
        );


        if (!article) {
            return res.status(403).json({
                message: "You are not allowed to update this article"
            });
        }


        res.json(article);


    } catch (error) {
        next(error);
    }
};



// Delete Article (Ownership Protected)
exports.deleteArticle = async (req, res, next) => {

    try {


        const article = await Article.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });


        if (!article) {
            return res.status(403).json({
                message: "You are not allowed to delete this article"
            });
        }


        res.json({
            message: "Article deleted successfully"
        });


    } catch (error) {
        next(error);
    }
};



// Search Articles
exports.searchArticles = async (req, res, next) => {

    try {

        const keyword = req.query.q;


        if (!keyword) {
            return res.status(400).json({
                message: "Search query is required"
            });
        }


        const results = await Article.find({
            $or: [
                {
                    title: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    content: {
                        $regex: keyword,
                        $options: "i"
                    }
                }
            ]
        });


        res.json(results);


    } catch (error) {
        next(error);
    }
};