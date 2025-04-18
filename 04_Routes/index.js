const http = require('http')
const url = require('url')
const port = 8080

const server = http.createServer(function(req,res){
    try {
        if(req.method === 'GET'){
            if(req.url == '/'){
                res.writeHead(200 , {'Content-Type':'text/html'})
                res.end("<h1>Homepage</h1>");
            }else if(req.url == '/about'){
                res.writeHead(200 , {'Content-Type':'text/html'})
                res.end("<h1>About Page</h1>");
            }else{
                res.writeHead(404 , {'Content-Type':'text/html'})
                res.end("<h1>Page not found!</h1>");
            }
        }else{
            throw new Error("Method not allowed")
        }
        
    } catch (error) {
        res.writeHead(500 , {'Content-Type':'text/html'})
        res.end("<h1>Server Error</h1>");
    }
})

server.listen(port,function(){
    console.log("Server Listening on port ",port)
})