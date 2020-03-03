let shell = require('shelljs');
const sftpConfig = require("./src/sftpConfig")

async function handler(event){
  const server = await sftpConfig.getSftpConfig();
  const commands = event;
  const host = {
  server: server,
  commands: commands
  };
  const SSH2Shell = require ('ssh2shell'),
    //Create a new instance passing in the host object
    SSH = new SSH2Shell(host),
    //Use a callback function to process the full session text
    callback = function(sessionText){
    }


    var exec = require('child_process').exec;
    function execute(command, callback){
        exec(command, function(error, stdout, stderr){ callback(stdout); });
    };
  
  //Start the process
  SSH.connect(callback);
}
exports.handler = handler;