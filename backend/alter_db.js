const mysql = require('mysql2/promise');

async function main() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ruangbelajar_db'
    });

    try {
        await db.query('ALTER TABLE quizzes ADD COLUMN description TEXT;');
        console.log('Column description added');
    } catch(e) { console.log(e.message); }

    try {
        await db.query('ALTER TABLE quizzes ADD COLUMN thumbnail_url VARCHAR(500);');
        console.log('Column thumbnail_url added');
    } catch(e) { console.log(e.message); }

    console.log('Schema update complete');
    await db.end();
}

main().catch(console.error);
