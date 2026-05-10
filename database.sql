CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kelas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_kelas VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    harga DECIMAL(10, 2),
    gambar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS donasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_donatur VARCHAR(100),
    jumlah DECIMAL(15, 2),
    pesan TEXT,
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kuis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pertanyaan TEXT NOT NULL,
    opsi_a VARCHAR(255),
    opsi_b VARCHAR(255),
    opsi_c VARCHAR(255),
    opsi_d VARCHAR(255),
    jawaban_benar CHAR(1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default admin
INSERT IGNORE INTO users (username, email, password, role) 
VALUES ('admin', 'admin@ruangbelajar.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'); 
-- password is 'password'
