const http = require('http')
const port = 8080

const server = http.createServer(function(req,res){
    res.setHeader('Content-Type','text/html')
    res.write("<h1>Hello World</h1>")
    res.end();
})

server.listen(port,function(){
    console.log("Server Listening on port ",port)
})