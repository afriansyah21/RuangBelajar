const mysql = require('mysql2/promise');

async function createDonationsTable() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ruangbelajar_db'
    });

    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS donations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                donator_name VARCHAR(255) NOT NULL,
                donation_method VARCHAR(100) NOT NULL,
                donation_date DATE NOT NULL,
                amount DECIMAL(15,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Tabel donations berhasil dibuat!');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await db.end();
    }
}

createDonationsTable();
