require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkTables() {
    const conn = await mysql.createConnection({
        host: 'ruangbelajar-afriansyahmaulana21.b.aivencloud.com',
        port: 12430,
        user: 'avnadmin',
        password: 'AVNS_Gm8Wg2wG4E2GF8aSSQT',
        database: 'defaultdb',
        ssl: { rejectUnauthorized: false }
    });
    
    const [rows] = await conn.query('SHOW TABLES');
    console.log('\n=== Tabel yang ada di Aiven ===');
    rows.forEach(r => console.log(' ✓', Object.values(r)[0]));
    console.log(`\nTotal: ${rows.length} tabel`);
    
    // Cek data users
    const [users] = await conn.query('SELECT COUNT(*) as total FROM users');
    console.log('Total users:', users[0].total);
    
    const [courses] = await conn.query('SELECT COUNT(*) as total FROM courses');
    console.log('Total courses:', courses[0].total);
    
    await conn.end();
}

checkTables().catch(err => console.error('Error:', err.message));
