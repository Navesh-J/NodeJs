const http = require('http')
const port = 8080;

const users=[
    {id:1,name:'Jone Doe'},
    {id:2,name:'Alex Jones'},
    {id:3,name:'Jane Harper'},
]

//logger Middleware
const logger = (req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next();
}

// JSON middleware
const jsonMiddleware = (req,res,next)=>{
    res.setHeader('Content-Type','application/json')
    next()
}

//Route handler for GET /api/users
const getuserHandler = (req,res,next)=>{
    res.write(JSON.stringify(users))
    res.end();
}
//Route handler for GET /api/users/id
const getuserByIdHandler = (req,res,next)=>{
    const id = req.url.split('/')[3];
    const user = users.find((user)=> user.id === parseInt(id))
    if(user){
        res.setHeader('Content-Type','application/json')
        res.write(JSON.stringify(user))
    }else{
        res.statusCode = 404
        res.write(JSON.stringify({message:'User Not found'}))
    }
    res.end();
}

//Not Found handler
const notFoundhandler = (req,res,next)=>{
    res.statusCode = 404
    res.write(JSON.stringify({message:'Route Not found'}))
    res.end();
}

//Route handler for POST /api/users
const createUserHandler = (req,res,next)=>{
    let body = '';
    //listen for data
    req.on('data',(chunk)=>{
        body+=chunk.toString();
    })
    req.on('end',()=>{
        const newUser = JSON.parse(body);
        users.push(newUser)
        res.statusCode = 201;
        res.write(JSON.stringify(newUser))
        res.end();
    })
}

const server = http.createServer((req,res)=>{
    logger(req,res,()=>{
        jsonMiddleware(req,res,()=>{
            if(req.url === '/api/users' && req.method === 'GET'){
                getuserHandler(req,res);
            }
            else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
                getuserByIdHandler(req,res);
            }
            else if(req.url === '/api/users' && req.method === 'POST'){
                createUserHandler(req,res);
            }
            else{
                notFoundhandler(req,res);
            }
        })
    })  
})

server.listen(port,function(){
    console.log("Server Listening on port",port)
})