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
            currentIP = total_arr.filter((element,index) => index > idx && index <= idx + 4).join("");
            resolve(currentIP);
        })
        .catch(err => {
        console.log(err);
        ps.dispose();
        });
    })
}

function InitPage(param){
    document.getElementById('content').innerText = param;
}

findIP().then((result)=>InitPage(result));