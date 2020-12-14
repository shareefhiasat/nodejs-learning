const http = require('http');
const fs = require('fs');
const lo = require('lodash');

// we can store it but we dont have to.
const server = http.createServer((req, res) => {
    // console.log('request made');
    // console.log(req.url, req.method);

    //test lodash command it will print radnom
    const randNumber = lo.random(0, 20);
    console.log(randNumber);

    //lodash this will print ONCE!
    const greet = lo.once(() => { console.log('greet') });
    greet();
    greet();
    greet();

    //set header content type
    // res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file
    // fs.readFile('./views/index.html', (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         // res.write(data);
    //         //or shorthand if you have only 1 thing to write
    //         res.end(data);
    //     }
    // });

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // res.write(data);
            //or shorthand if you have only 1 thing to write
            res.end(data);
        }
    });

    //VERY BASIC WAY
    // //write the response
    // res.write('<head><link rel="stylesheet" href="#></link></head>')
    // // res.write('hello, shareef.');
    // res.write('<h1>hello, shareef.</h1>');

    // //close the response
    // res.end();
});

//default is localhost, but we define it explicity here
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});