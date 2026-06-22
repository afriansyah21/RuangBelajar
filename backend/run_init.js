const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function run() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        multipleStatements: true
    });
    
    const sql = fs.readFileSync(path.join(__dirname, '../init_db.sql'), 'utf8');
    await connection.query(sql);
    console.log('Database initialized successfully');
    process.exit(0);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
