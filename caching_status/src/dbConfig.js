var AWS = require('aws-sdk');
var ssm = new AWS.SSM();


exports.getDBConfig = async function() {
    var dbConfig = {
        options: {
        enableArithAbort:false}
    };

    var myPromise = new Promise((resolve, reject) => {
        var params = {
            Names: [
                `/${process.env.stage}/mssql/username`,
                `/${process.env.stage}/mssql/databaseName`,
                `/${process.env.stage}/mssql/host`,
                `/${process.env.stage}/mssql/password`,
                `/${process.env.stage}/mssql/port`
            ],
            WithDecryption: true
        };
        ssm.getParameters(params, function (err, data) {
            if (err) reject(err, err.stack);
            else {
                var parameters = data.Parameters;
                parameters.forEach(function (value) {
                    switch (value.Name) {
                        case `/${process.env.stage}/mssql/username`:
                            dbConfig['user'] = value.Value;
                            break;
                        case `/${process.env.stage}/mssql/databaseName`:
                            dbConfig['database'] = value.Value;
                            break;
                        case `/${process.env.stage}/mssql/host`:
                            dbConfig['server'] = value.Value;
                            break;
                        case `/${process.env.stage}/mssql/password`:
                            dbConfig['password'] = value.Value;
                            break;
                        case `/${process.env.stage}/mssql/port`:
                            dbConfig['port'] = Number(value.Value);
                            break;
                    }
                });
                resolve(dbConfig);
            }
        });
    });
    return myPromise;
}
















