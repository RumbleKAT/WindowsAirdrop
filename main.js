const shell = require('node-powershell');
var currentIP;
const regExp = /([A-Za-z1-9.:])\w+/g;

let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

function findIP(){
    return new Promise((resolve) =>{
        ps.addCommand('ipconfig')
        ps.invoke()
        .then(output => {
            let total_arr = output.match(regExp)
            let idx = total_arr.findIndex((element)=> element === 'IPv4')
            currentIP = 'http://' + total_arr.filter((element,index) => index > idx && index <= idx + 4).join("");
            resolve(currentIP);
        })
        .catch(err => {
        console.log(err);
        ps.dispose();
        });
    })
}

function ajax(url){
    return new Promise((resolve)=>{
        var req = new XMLHttpRequest();
        req.open('POST','http://localhost:8080/shortenUrl',false)
        req.setRequestHeader('Content-Type','application/json;charset=UTF=8');
        req.onreadystatechange = function(evt){
            if(req.readyState === 4){
                if(req.status === 200){
                    resolve(JSON.parse(JSON.parse(req.responseText)));
                }
            }
        }
        req.send(JSON.stringify({
            'url' : url
        }))
    });
}

function InitPage(param){
    document.getElementById('content').innerText = param        
    ajax(param).then((result)=>{
        console.log(result);
        document.getElementById('shortenUrl').innerText = result.result.url;                
    })
}

findIP().then((result)=>InitPage(result));