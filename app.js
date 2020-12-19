//Add models
const Blog = require('./models/blog');

// add Morgan
const morgan = require('morgan');

//import express
const express = require('express');
const { mongo } = require('mongoose');

//express app
const app = express();

//mongo db 3rd party
const mongoose = require('mongoose');

//connect to db
const dbUri = 'mongodb://127.0.0.1:27017/mydb';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log('Error', err));

//middleware and static files
app.use(express.static('public'));

//use morgan for logging
app.use(morgan('dev'));

//middleware
app.use(express.urlencoded({ extended: true }));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));

});

//get all mongodb blogs
app.get('/all-blogs', (req, res) =>
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
);

//get single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('5fdced3b1180960f752bd11f')
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        });
});

//register view engine, this will look into views folder by default
app.set('view engine', 'ejs');
//custom views folder
// app.set('views', 'my-views');

//listen for request, we can store it in instance for using sockets.
// app.listen(3000);

app.use((req, res, next) => {
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('Test another next');
    next();
});

app.get('/', (req, res) => {
    //method 1
    // res.write('something');
    // res.end();

    //method 2
    // res.send('<p>home page</p>')

    //method 3 its relative path by default it seeks absolute path!
    // res.sendFile('./views/index.html', { root: __dirname });

    //method 4 dynamic content
    // res.render('index');

    // const blogs = [
    //     { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    // ];

    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});

//add redirect example
// app.get('/about', (req, res) => { res.send('<p>about</p>') });
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
    // res.sendFile('./views/about.html', { root: __dirname });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ CreatedAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => console.log(err))
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

//app post create blog
app.post('/blogs', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.redirect('/'))
        .catch((err) => console.log(err))
})

//Manage notfound, iff we dont have match and reach this point redirect to 404 not found page!, so we put it at last
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});
