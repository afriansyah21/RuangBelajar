const mysql = require('mysql2/promise');

async function createPaymentMethodsTable() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ruangbelajar_db'
    });

    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS payment_methods (
                id INT AUTO_INCREMENT PRIMARY KEY,
                type ENUM('qris', 'bank') NOT NULL,
                bank_name VARCHAR(255) DEFAULT NULL,
                account_number VARCHAR(255) DEFAULT NULL,
                image_data LONGTEXT DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Tabel payment_methods berhasil dibuat!');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await db.end();
    }
}

createPaymentMethodsTable();
