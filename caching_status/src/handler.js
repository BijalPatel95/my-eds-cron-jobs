var AWS = require('aws-sdk');
var ssm = new AWS.SSM();
const database = require("./database")
const notify = require("./notifySlack");

async function test(){
    try {
	  const query = `SELECT * FROM cachingStatus`// WHERE STATUS NOT IN (1,5) OR (STATUS IN (1) AND GETDATE()>DATEADD(MINUTE,450,cast(CAST(GETDATE() AS date) as datetime)))'
	  const result = await database.runQuery(query);

		if(result.length > 0)
		{
			postBody = `Status Codes : \n 1 : Loading \n 2 : Behind Schedule Time \n 3 : Failed  \n 4 : Needs Attention \n 5 : Success \n\n Following Rules Are Either Caching Or Having Trouble Caching \n\n STATUS : RULE_NAME : PATH : ERROR_MESSAGE \n\n`;
			postBody2 = "";
  			for(let row of result){
				postBody2 = `${postBody2} \n ${row['STATUS']} : ${row['PATH']} : ${row['ERROR_MESSAGE']} \n`
			  }
			console.log(`${postBody} ${postBody2}`)
			// notify.notifyProcessOnSlack(`${postBody} ${postBody2}`);
		}else{
			console.log('No rows')
			// notify.notifyProcessOnSlack(`No data found`);
		}
		
	} catch(e){
		console.log(e)
		// notify.notifyErrorOnSlack(e);
	}
}

// test()

exports.default = test;