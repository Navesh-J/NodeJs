const fs=require('fs');

const requestHandler=function(req,res){

    const url=req.url;
    const method=req.method;

    // fetching requests 
    // console.log(req);
    // console.log(req.url,req.method);
    // process.exit(); -- server exits (not in practice as we do not want our serevr to end)

    if(url==='/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>My Homepage</title></head>');
        res.write('<body><h1>Click send request to send the request and route to another page</h1><form action="/message" method="POST"><input type="text" name ="your message here"><button type="submit">Send Request</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    //store the data submitted by user in txt file
    if(url==='/message' && method==='POST'){

        //listening request events
        const body=[];
        req.on('data',function(chunk){
            console.log(chunk);
            body.push(chunk);
        })
        return req.on('end',function(){
            const parsedBody=Buffer.concat(body).toString();
            const message=parsedBody.split('=')[1];
            console.log(parsedBody);
            console.log(message);
            fs.writeFile('messages.txt',message,function(err){
                res.statusCode=302;
                res.setHeader('Location','/')
                return res.end();
            });
        })

    }

    // sending response 
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My Node Page</title></head>');
    res.write('<body><h1>Welcome to my node server</h1><h2>This text is rendered from server response</h2></body>');
    res.write('</html>');
    res.end(); //end of response
}

module.exports=requestHandler;