// add Morgan
const morgan = require('morgan');

//import express
const express = require('express');

//express app
const app = express();

//middleware and static files
app.use(express.static('public'));

//use morgan for logging
app.use(morgan('dev'));

//register view engine, this will look into views folder by default
app.set('view engine', 'ejs');
//custom views folder
// app.set('views', 'my-views');

//listen for request, we can store it in instance for using sockets.
app.listen(3000);

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

    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];

    res.render('index', { title: 'Home', blogs });
});

//add redirect example
// app.get('/about', (req, res) => { res.send('<p>about</p>') });
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
    // res.sendFile('./views/about.html', { root: __dirname });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

//Manage notfound, iff we dont have match and reach this point redirect to 404 not found page!, so we put it at last
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});
