const mysql = require("mysql2");



const getConnection=()=>{

    return mysql.createConnection({

        host: "localhost",
        user: "root",
        password: "",
        database: "guri_sheeg"
    })

}


module.exports.initialize=getConnection;


