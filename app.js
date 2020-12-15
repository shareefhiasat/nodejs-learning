//import express
const express = require('express');

//express app
const app = express();

//listen for request, we can store it in instance for using sockets.
app.listen(3000);

app.get('/', (req, res) => {
    //method 1
    // res.write('something');
    // res.end();

    //method 2
    // res.send('<p>home page</p>')

    //method 3 its relative path by default it seeks absolute path!
    res.sendFile('./views/index.html', { root: __dirname });
});

//add redirect example
// app.get('/about', (req, res) => { res.send('<p>about</p>') });
app.get('/about', (req, res) => { res.sendFile('./views/about.html', { root: __dirname }) });

//Manage notfound, iff we dont have match and reach this point redirect to 404 not found page!, so we put it at last
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});
