let shell = require('shelljs');
const dbConfig = require("./src/dbConfig")

async function handler(event){
  const server = await dbConfig.getDBConfig();
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
  
  //Start the process
  SSH.connect(callback);
}