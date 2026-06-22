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
            CREATE TABLE IF NOT EXISTS quiz_question_groups (
                id INT AUTO_INCREMENT PRIMARY KEY,
                quiz_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
            )
        `);
        console.log('Created quiz_question_groups table');
    } catch(e) { console.log(e.message); }

    try {
        await db.query('ALTER TABLE quiz_questions ADD COLUMN group_id INT DEFAULT NULL');
        console.log('Column group_id added to quiz_questions');
    } catch(e) { console.log(e.message); }

    try {
        await db.query('ALTER TABLE quiz_questions ADD FOREIGN KEY (group_id) REFERENCES quiz_question_groups(id) ON DELETE CASCADE');
        console.log('Foreign key group_id added to quiz_questions');
    } catch(e) { console.log(e.message); }

    console.log('Schema update complete');
    await db.end();
}

main().catch(console.error);
