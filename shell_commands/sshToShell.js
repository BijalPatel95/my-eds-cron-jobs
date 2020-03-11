let shell = require('shelljs');
var ping = require('ping');
// var dns = require('dns');
// const sftpConfig = require("./src/sftpConfig")

async function handler(){
  var hosts = ['sftp.equitydatascience.com','157.56.13.143'];
  hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
              var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
              console.log(msg);
          });
        });

  // var ip = dns.lookup('sftp.equitydatascience.com', function (err, addresses, family) {
  //   console.log(addresses);
  // });

  // // const server = await sftpConfig.getSftpConfig();
  // // const commands = event;
  // const host = {
  // server: {
  //   host: "sftp.equitydatascience.com",
  //   userName: "edsadmin",
  //   password: "OzayOrg11245",
  // },
  // commands: [
  //   "msg:Connected",
  //   "echo $(pwd)",
  //   "ls -l"
  //  ]
  // };
  // const SSH2Shell = require ('ssh2shell'),
  //   //Create a new instance passing in the host object
  //   SSH = new SSH2Shell(host),
  //   //Use a callback function to process the full session text
  //   callback = function(sessionText){
  //     console.log(sessionText);
  //   }
  
  // //Start the process
  // SSH.connect(callback);
}
handler();
// exports.handler = handler;