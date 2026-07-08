require('dotenv').config();
const mysql = require('mysql2/promise');

// Cache pool di global variable agar tidak buat koneksi baru
// di setiap Vercel serverless invocation (reuse instance yang sudah warm)
if (!global._dbPool) {
    global._dbPool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'ruangbelajar_db',
        port: parseInt(process.env.DB_PORT) || 3306,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
        waitForConnections: true,
        connectionLimit: 3,
        queueLimit: 0,
        connectTimeout: 30000,
        acquireTimeout: 30000,
        timeout: 30000
    });
    console.log('Database pool created (new instance)');
} else {
    console.log('Database pool reused (warm instance)');
}

module.exports = global._dbPool;
