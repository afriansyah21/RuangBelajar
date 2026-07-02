const pool = require('./db');

async function alterFeedbackDb() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS feedbacks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(255) NOT NULL DEFAULT 'Pengguna',
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Table feedbacks created or already exists.');
    } catch (error) {
        console.error('Error creating feedbacks table:', error);
    } finally {
        process.exit();
    }
}

alterFeedbackDb();
