const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');

const blogController = require('../controllers/blog-controller');

//mongoose and mongo sandbox routes
router.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));

});

router.get('/', blogController.blog_index);

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

//app post create blog
router.post('/', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.redirect('/'))
        .catch((err) => console.log(err))
});

//get all mongodb blogs
router.get('/all-blogs', (req, res) =>
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
);

//get single blog
router.get('/single-blog', (req, res) => {
    Blog.findById('5fdced3b1180960f752bd11f')
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        });
});

module.exports = router;