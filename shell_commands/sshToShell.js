let shell = require('shelljs');
var ping = require('ping');
var ip = require('ip');
// const sftpConfig = require("./src/sftpConfig")

async function handler(){
  console.log(ip.address());
  // var hosts = ['sftp.equitydatascience.com'];
 
  //   hosts.forEach(function (host) {
  //       ping.promise.probe(host)
  //           .then(function (res) {
  //               console.log(res);
  //           });
  //   });



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