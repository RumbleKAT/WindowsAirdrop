const express = require('express')
const http = require('http')
const port = 8080;

const server = express()
const client = require('./secret_keys')
const request = require('request')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  })
const upload = multer({ dest: 'uploads/', storage: storage});

server.use(express.json())
server.use(express.static('public'))
server.use('/files', express.static('uploads'));


server.get('/upload',(req,res)=>{
    res.render('index.html');
})

server.post('/upload', upload.single('userfile'), function(req, res){
    let fullUrl = req.protocol + '://' + req.get('host');
    console.log('업로드 성공!...');
    res.redirect(fullUrl);
});

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