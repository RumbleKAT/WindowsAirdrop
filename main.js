const shell = require('node-powershell');
var total;
const regExp = /([A-Za-z1-9.:])\w+/g;

let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

function findIP(){
    console.log("!!")
    
    ps.addCommand('ipconfig')
    ps.invoke()
    .then(output => {
        total = output
        matches_arr = total.match(regExp);
        //reducer ... slice match_arr
    })
    .catch(err => {
    console.log(err);
    ps.dispose();
    });
}

findIP();