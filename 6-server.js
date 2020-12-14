const http = require('http');
const fs = require('fs');

// we can store it but we dont have to.
const server = http.createServer((req, res) => {
    // console.log('request made');
    console.log(req.url, req.method);

    //set header content type
    // res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');

    //send an html file
    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // res.write(data);
            //or shorthand if you have only 1 thing to write
            res.end(data);
        }
        res.end();
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