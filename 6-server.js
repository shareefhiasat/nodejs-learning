const http = require('http');

// we can store it but we dont have to.
const server = http.createServer((req, res) => {
    // console.log('request made');
    console.log(req.url, req.method);

    //set header content type
    // res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');

    //write the response
    res.write('<head><link rel="stylesheet" href="#></link></head>')
    // res.write('hello, shareef.');
    res.write('<h1>hello, shareef.</h1>');

    //close the response
    res.end();
});

//default is localhost, but we define it explicity here
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});