const mysql = require('mysql2/promise');

async function updateDatabase() {
    try {
        // GANTI PASSWORD DI BAWAH INI
        const passwordAiven = "AVNS_Gm8Wg2wG4E2GF8aSSQT";

        if (passwordAiven === "PASTE_PASSWORD_AIVEN_DISINI") {
            console.log("❌ ERROR: Anda belum memasukkan password Aiven!");
            console.log("Silakan buka file update_db.js dan ganti 'PASTE_PASSWORD_AIVEN_DISINI' dengan password Anda.");
            process.exit(1);
        }

        const pool = mysql.createPool({
            host: 'ruangbelajar-afriansyahmaulana21.b.aivencloud.com',
            port: 12430,
            user: 'avnadmin',
            password: passwordAiven,
            database: 'defaultdb',
            ssl: { rejectUnauthorized: false }
        });

        console.log('⏳ Menghubungkan ke database Aiven...');
        
        const [columns] = await pool.query(`SHOW COLUMNS FROM users LIKE 'profile_picture'`);
        if (columns.length === 0) {
            console.log('⏳ Menambahkan kolom profile_picture...');
            await pool.query(`ALTER TABLE users ADD COLUMN profile_picture VARCHAR(255) DEFAULT NULL`);
            console.log('✅ BERHASIL! Kolom profile_picture sudah ditambahkan.');
        } else {
            console.log('✅ Kolom profile_picture sudah ada sebelumnya.');
        }

        process.exit(0);
    } catch (e) {
        console.error('❌ GAGAL:', e.message);
        process.exit(1);
    }
}

updateDatabase();
