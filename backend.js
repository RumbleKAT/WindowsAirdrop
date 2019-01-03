const express = require('express')
const http = require('http')
const port = 8080;

const server = express()
const client = require('./secret_keys')
const request = require('request')

server.use(express.json())
server.get('/upload',(req,res)=>{
    res.end('<h1>Good!</h1')
})

server.post('/shortenUrl',(req,res)=>{
    let query = encodeURI(req.body.url)
    const option = {
        url : 'https://openapi.naver.com/v1/util/shorturl',
        form : {'url' : query},
        headers : { 'X-Naver-Client-Id' : client.id,
                    'X-Naver-Client-Secret' : client.pw
        }
    }

    request.post(option, (err,response,body) => {
        if(!err && response.statusCode === 200){
            res.json(body);
        }else{
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    })        
})

http.createServer(server).listen(port,()=>{
    console.log('localhost:8080 is running...')
})