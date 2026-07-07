require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

async function importSQL() {
    const buf = fs.readFileSync('C:\\Users\\USER\\Documents\\ruangbelajar_utf8.sql');
    let sql = (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) ? buf.slice(3).toString('utf8') : buf.toString('utf8');
    sql = sql.replace(/\r\n/g, '\n');
    
    // Strip semua conditional comments /*!NNNNN ... */; karena MariaDB berbeda dari MySQL 8
    sql = sql.replace(/\/\*![\s\S]*?\*\/;/g, '');
    
    // Filter baris yang tidak kompatibel
    const lines = sql.split('\n').filter(line => {
        const t = line.trim();
        if (t.startsWith('DELIMITER')) return false;
        if (t.startsWith('SET character_set_client')) return false;
        if (t.startsWith('SET character_set_results')) return false;
        if (t.startsWith('SET collation_connection')) return false;
        return true;
    });
    sql = lines.join('\n');
    
    // Tambah foreign key disable di awal
    sql = 'SET FOREIGN_KEY_CHECKS=0;\nSET UNIQUE_CHECKS=0;\n' + sql + '\nSET FOREIGN_KEY_CHECKS=1;\nSET UNIQUE_CHECKS=1;';

    // Tampilkan 200 karakter pertama untuk debugging
    console.log('=== Awal SQL setelah pembersihan ===');
    console.log(sql.substring(0, 500));
    console.log('=== Akhir preview ===\n');
    
    // Split berdasarkan ;\n
    const rawStatements = sql.split(/;\s*\n/);
    const statements = rawStatements
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`Total statements: ${statements.length}`);
    console.log('Statement 1:', statements[0] ? statements[0].substring(0, 100) : 'KOSONG');
    console.log('Statement 2:', statements[1] ? statements[1].substring(0, 100) : 'KOSONG');
    console.log('Statement 3:', statements[2] ? statements[2].substring(0, 100) : 'KOSONG');
    
    const conn = await mysql.createConnection({
        host: 'ruangbelajar-afriansyahmaulana21.b.aivencloud.com',
        port: 12430,
        user: 'avnadmin',
        password: 'AVNS_Gm8Wg2wG4E2GF8aSSQT',
        database: 'defaultdb',
        ssl: { rejectUnauthorized: false },
        multipleStatements: false,
        charset: 'utf8mb4'
    });
    
    console.log('\nTerhubung ke Aiven!');
    
    let success = 0, errors = 0;
    for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        try {
            await conn.query(stmt);
            success++;
            if (success % 5 === 0) process.stdout.write(`✓${success} `);
        } catch (err) {
            if (!err.message.includes('already exists') && !err.message.includes('Duplicate')) {
                console.log(`\nError ${i+1}: ${err.message.substring(0, 120)}`);
                console.log('Statement:', stmt.substring(0, 150));
            }
            errors++;
        }
    }
    
    console.log(`\n\n✅ SELESAI! Berhasil: ${success}, Error: ${errors}`);
    await conn.end();
}

importSQL().catch(err => {
    console.error('❌ Fatal:', err.message);
    process.exit(1);
});
