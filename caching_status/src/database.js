const sql = require('mssql')
const dbConfig = require("./dbConfig")

class Database {
    static async runQuery(query) {
        try {
            const config = await dbConfig.getDBConfig();
            console.log('database : ',config);
            await sql.connect(config);
            console.log('connected')
            const result = await sql.query(query)
            sql.close()
            return result["recordset"]
        } catch (e) {
            throw e
        }
    }
}
module.exports = Database

