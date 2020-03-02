const sql = require('mssql')
// const dbConfig = require("./dbConfig")
var AWS = require('aws-sdk');
var ssm = new AWS.SSM();

var dbConfig = {
    options: {
    enableArithAbort:false}
};

class Database {
    static async runQuery(query) {
        try {
            // const config = await dbConfig.getDBConfig();
                var params = {
                    Names: ['/${process.env.stage}/mssql/username',
                    '/${process.env.stage}/mssql/databaseName',
                    '/${process.env.stage}/mssql/host',
                    '/${process.env.stage}/mssql/password',
                    '/${process.env.stage}/mssql/port'],
                    WithDecryption: true
                    };
                 
                var request = await ssm.getParameters(params).promise();
                
                var parameters = request.Parameters;
                parameters.forEach(function (value) {
                    switch (value.Name) {
                        case "/${process.env.stage}/mssql/username":
                            dbConfig['user'] = value.Value;
                            break;
                        case '/${process.env.stage}/mssql/databaseName':
                            dbConfig['database'] = value.Value;
                            break;
                        case '/${process.env.stage}/mssql/host':
                            dbConfig['server'] = value.Value;
                            break;
                        case '/${process.env.stage}/mssql/password':
                            dbConfig['password'] = value.Value;
                            break;
                        case '/${process.env.stage}/mssql/port':
                            dbConfig['port'] = Number(value.Value);
                            break;
                    }
                    });

            console.log('database : ',dbConfig);

            await sql.connect(dbConfig);
            console.log('connected')
            const result = await sql.query(query)
            sql.close()
            return result["recordset"]
        } catch (e) {
            //slack.notifyError(e);
            throw e
        }
    }
}
module.exports = Database

