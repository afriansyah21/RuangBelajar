const mysql = require('mysql2/promise');

async function main() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ruangbelajar_db'
    });

    try {
        await db.query(`
            ALTER TABLE materials
            ADD COLUMN youtube_link VARCHAR(500) DEFAULT NULL,
            ADD COLUMN short_description TEXT DEFAULT NULL,
            ADD COLUMN summary TEXT DEFAULT NULL
        `);
        console.log('Columns added to materials table');
    } catch(e) {
        if (e.code === 'ER_DUP_FIELDNAME') {
            console.log('Columns already exist');
        } else {
            console.log(e.message);
        }
    }

    console.log('Schema update complete');
    await db.end();
}

main().catch(console.error);
