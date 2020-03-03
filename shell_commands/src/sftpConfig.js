var AWS = require('aws-sdk');
var ssm = new AWS.SSM();


exports.getSftpConfig = async function() {
    var sftpConfig = {
        options: {
        enableArithAbort:false}
    };

    var myPromise = new Promise((resolve, reject) => {
        var params = {
            Names: [
                `/${process.env.stage}/sftp/username`,
                `/${process.env.stage}/sftp/hostname`,
                `/${process.env.stage}/sftp/password`,
            ],
            WithDecryption: true
        };
        ssm.getParameters(params, function (err, data) {
            if (err) reject(err, err.stack);
            else {
                var parameters = data.Parameters;
                parameters.forEach(function (value) {
                    switch (value.Name) {
                        case `/${process.env.stage}/sftp/username`:
                            sftpConfig['user'] = value.Value;
                            break;
                        case `/${process.env.stage}/sftp/hostname`:
                            sftpConfig['host'] = value.Value;
                            break;
                        case `/${process.env.stage}/sftp/password`:
                            sftpConfig['password'] = value.Value;
                            break;
                    }
                });
                resolve(sftpConfig);
            }
        });
    });
    return myPromise;
}
















