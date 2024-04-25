// Create web server
// 1. Load the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];
// 2. Create server
http.createServer(function(request, response){
    var urlObj = url.parse(request.url, true);
    if(urlObj.pathname === '/'){
        // 3.1 Read the file and return the content
        fs.readFile('./index.html', function(err, data){
            if(err){
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.end('<h1>Not Found</h1>');
            } else{
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    } else if(urlObj.pathname === '/submit'){
        // 3.2 Read the content of the file
        fs.readFile('./submit.html', function(err, data){
            if(err){
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.end('<h1>Not Found</h1>');
            } else{
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    } else if(urlObj.pathname === '/comment'){
        // 3.3 Read the content of the file
        var comment = urlObj.query;
        comments.push(comment);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(JSON.stringify(comments));
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('<h1>Not Found</h1>');
    }
}).listen(3000, function(){
    console.log('Server is running on http://localhost:3000/');
});
// 4. Listen on port 3000
// 5. Run the server: node comments.js
// 6. Test the server: http://localhost:3000/
