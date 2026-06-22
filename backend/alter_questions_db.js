const mysql = require('mysql2/promise');

async function main() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ruangbelajar_db'
    });

    try {
        await db.query('ALTER TABLE quiz_questions ADD COLUMN title VARCHAR(255);');
        console.log('Column title added to quiz_questions');
    } catch(e) { console.log(e.message); }

    try {
        await db.query('ALTER TABLE quiz_questions ADD COLUMN explanation TEXT;');
        console.log('Column explanation added to quiz_questions');
    } catch(e) { console.log(e.message); }

    console.log('Schema update complete');
    await db.end();
}

main().catch(console.error);
