-- =========================================================================
-- TUGAS UAS PEMROGRAMAN BASIS DATA
-- Nama Database: ruangbelajar_db
-- =========================================================================

-- Persiapan Database
DROP DATABASE IF EXISTS ruangbelajar_db;
CREATE DATABASE ruangbelajar_db;
USE ruangbelajar_db;

-- =========================================================================
-- 1. PEMBUATAN TABEL DAN RELASI (Ketentuan 1)
-- Mengandung tabel relasi 1:1, 1:N, dan N:M
-- =========================================================================

-- Tabel 1: courses
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel 2: materials (Relasi 1:N dengan courses)
CREATE TABLE materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Tabel 3: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    birth_date DATE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel 4: user_profiles (Relasi 1:1 dengan users)
CREATE TABLE user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    bio TEXT,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel 5: quizzes (Relasi 1:N dengan courses)
CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Tabel 6: quiz_questions (Relasi 1:N dengan quizzes)
CREATE TABLE quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    options JSON NOT NULL,
    correct_answer_index INT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Tabel 7: user_material_progress (Relasi N:M users dan materials)
CREATE TABLE user_material_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    material_id INT NOT NULL,
    is_completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE,
    UNIQUE KEY (user_id, material_id)
);

-- Tabel 8: user_quiz_results (Relasi N:M users dan quizzes)
CREATE TABLE user_quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Tabel 9: activity_logs 
-- (Untuk memenuhi syarat indexing composite di dalam CREATE TABLE)
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    action_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- INDEXING 1: Index dengan composite key dibuat saat CREATE TABLE (Ketentuan 2.d.i)
    INDEX idx_user_action (user_id, action_type)
);


-- =========================================================================
-- 2. TRIGGER (Ketentuan 2.c)
-- Dibuat lebih awal agar data dummy triggers saat di-insert
-- =========================================================================
DELIMITER $$

-- TRIGGER 1: AFTER INSERT (Otomatis membuat user_profile kosong)
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_profiles (user_id, bio, address) 
    VALUES (NEW.id, 'Pengguna baru di RuangBelajar', 'Belum diatur');
END$$

-- TRIGGER 2: BEFORE UPDATE (Mencegah score turun dan menggunakan NEW & OLD)
CREATE TRIGGER before_score_update
BEFORE UPDATE ON user_quiz_results
FOR EACH ROW
BEGIN
    IF NEW.score < OLD.score THEN
        -- Cegah update ke nilai yang lebih kecil
        SET NEW.score = OLD.score;
        INSERT INTO activity_logs (user_id, action_type, action_details)
        VALUES (NEW.user_id, 'SCORE_UPDATE_DENIED', CONCAT('Mencoba menurunkan nilai kuis dari ', OLD.score, ' ke ', NEW.score));
    ELSE
        INSERT INTO activity_logs (user_id, action_type, action_details)
        VALUES (NEW.user_id, 'SCORE_UPDATED', CONCAT('Berhasil memperbarui nilai dari ', OLD.score, ' ke ', NEW.score));
    END IF;
END$$

DELIMITER ;


-- =========================================================================
-- 3. INSERT DATA DUMMY (Minimal 10 baris per tabel - Ketentuan 1.a)
-- =========================================================================

-- Insert 10 Courses
INSERT INTO courses (title, description) VALUES 
('Frontend Web Dev', 'Belajar dasar antarmuka web'), ('Backend NodeJS', 'Pemrograman server dengan Node JS'),
('UI/UX Design', 'Konsep desain antarmuka dan pengalaman pengguna'), ('ReactJS Mastery', 'Menguasai framework React'),
('Python untuk Data Science', 'Belajar dasar Python untuk analisis data'), ('Cybersecurity 101', 'Pengenalan keamanan siber'),
('Mobile App Flutter', 'Membuat aplikasi mobile Android dan iOS'), ('DevOps Dasar', 'Konsep CI/CD dan Deployment'),
('Game Programming', 'Membuat game 2D dengan Unity'), ('Digital Marketing', 'Pemasaran produk secara digital');

-- Insert 10 Materials
INSERT INTO materials (course_id, title) VALUES
(1, 'Pengenalan HTML'), (1, 'CSS Styling'), (2, 'Node.js Basic'), (2, 'Express JS Setup'), (3, 'Warna dan Tipografi'),
(3, 'Prototyping Figma'), (4, 'React Hooks'), (5, 'Pandas dan Numpy'), (7, 'Dart Programming'), (8, 'Docker Basics');

-- Insert 10 Users (Otomatis men-trigger after_user_insert ke tabel user_profiles)
INSERT INTO users (full_name, email, password) VALUES 
('Andi Susanto', 'andi@test.com', 'pass123'), ('Budi Rahayu', 'budi@test.com', 'pass123'),
('Caca Marica', 'caca@test.com', 'pass123'), ('Dodi Mulyadi', 'dodi@test.com', 'pass123'),
('Eka Pratama', 'eka@test.com', 'pass123'), ('Fani Wijaya', 'fani@test.com', 'pass123'),
('Gita Salsabila', 'gita@test.com', 'pass123'), ('Hadi Kurniawan', 'hadi@test.com', 'pass123'),
('Irfan Hakim', 'irfan@test.com', 'pass123'), ('Joko Susilo', 'joko@test.com', 'pass123');

-- Insert 10 Quizzes
INSERT INTO quizzes (course_id, title) VALUES
(1, 'Kuis HTML'), (1, 'Kuis CSS'), (2, 'Kuis Node JS'), (3, 'Kuis Desain Dasar'), (4, 'Kuis React Component'),
(5, 'Kuis Python Basic'), (6, 'Kuis Cyber'), (7, 'Kuis Dart'), (8, 'Kuis Container'), (9, 'Kuis Logic Game');

-- Insert 10 Quiz Questions
INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer_index) VALUES
(1, 'Apa kepanjangan HTML?', '["Hyper Text", "Home Tool"]', 0), (2, 'Properti CSS warna huruf?', '["color", "bg"]', 0),
(3, 'Node JS jalan di mana?', '["Server", "Browser"]', 0), (4, 'Software desain UI?', '["Figma", "Word"]', 0),
(5, 'Hook React untuk state?', '["useState", "useEffect"]', 0), (6, 'Library data science?', '["Pandas", "React"]', 0),
(7, 'Port default HTTP?', '["80", "443"]', 0), (8, 'Flutter buatan siapa?', '["Google", "Meta"]', 0),
(9, 'Apa itu Docker?', '["Container", "VM"]', 0), (10, 'Fungsi Update() di Unity?', '["Tiap frame", "Sekali jalan"]', 0);

-- Insert 10 User Progress
INSERT INTO user_material_progress (user_id, material_id) VALUES
(1, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 7), (7, 8), (8, 9), (9, 10);

-- Insert 10 User Quiz Results
INSERT INTO user_quiz_results (user_id, quiz_id, score) VALUES
(1, 1, 80), (1, 2, 90), (2, 3, 75), (3, 4, 100), (4, 5, 85), 
(5, 6, 60), (6, 7, 70), (7, 8, 95), (8, 9, 88), (9, 10, 50);


-- =========================================================================
-- 4. FUNCTION (Ketentuan 2.a)
-- =========================================================================
DELIMITER $$

-- Function 1 (Parameter kosong)
CREATE FUNCTION get_total_users() 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total FROM users;
    RETURN total;
END$$

-- Function 2 (Dengan 2 parameter)
CREATE FUNCTION get_user_score_by_quiz(p_user_id INT, p_quiz_id INT) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_score INT;
    SELECT score INTO v_score 
    FROM user_quiz_results 
    WHERE user_id = p_user_id AND quiz_id = p_quiz_id 
    LIMIT 1;
    RETURN IFNULL(v_score, 0);
END$$

DELIMITER ;


-- =========================================================================
-- 5. STORED PROCEDURE (Ketentuan 2.b)
-- =========================================================================
DELIMITER $$

-- Procedure 1 (Tanpa parameter): Generate > 1000 baris data untuk Indexing
CREATE PROCEDURE generate_dummy_activity_logs()
BEGIN
    DECLARE i INT DEFAULT 1;
    -- Menggunakan LOOP control flow (Ketentuan 2.b.ii)
    generate_loop: LOOP
        IF i > 2000 THEN
            LEAVE generate_loop;
        END IF;
        
        INSERT INTO activity_logs (user_id, action_type, action_details)
        VALUES (
            (i % 10) + 1, 
            IF(i % 2 = 0, 'LOGIN', 'VIEW_COURSE'), 
            CONCAT('Log baris ke ', i)
        );
        SET i = i + 1;
    END LOOP generate_loop;
END$$

-- Procedure 2 (Dengan 2 parameter IN, Mengandung Cursor dan IF)
CREATE PROCEDURE update_user_password(IN p_user_id INT, IN p_new_password VARCHAR(255))
BEGIN
    DECLARE v_user_exists INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur_email VARCHAR(255);
    
    -- Menggunakan Cursor
    DECLARE email_cursor CURSOR FOR SELECT email FROM users WHERE id = p_user_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    SELECT COUNT(*) INTO v_user_exists FROM users WHERE id = p_user_id;
    
    -- Menggunakan IF Statement
    IF v_user_exists > 0 THEN
        UPDATE users SET password = p_new_password WHERE id = p_user_id;
        
        OPEN email_cursor;
        read_loop: LOOP
            FETCH email_cursor INTO cur_email;
            IF done THEN
                LEAVE read_loop;
            END IF;
            
            INSERT INTO activity_logs (user_id, action_type, action_details)
            VALUES (p_user_id, 'UPDATE_PASSWORD', CONCAT('Password updated for ', cur_email));
        END LOOP;
        CLOSE email_cursor;
    END IF;
END$$

DELIMITER ;

-- Eksekusi Procedure 1 (Membangkitkan 2000 baris data)
CALL generate_dummy_activity_logs();


-- =========================================================================
-- 6. INDEXING Lanjutan (Ketentuan 2.d)
-- =========================================================================

-- INDEXING 2: Membuat index dengan CREATE INDEX (Composite)
CREATE INDEX idx_user_material ON user_material_progress(user_id, material_id);

-- INDEXING 3: Membuat index dengan ALTER TABLE (Composite)
ALTER TABLE user_quiz_results ADD INDEX idx_user_score (user_id, score);


-- =========================================================================
-- 7. VIEW (Ketentuan 2.e)
-- =========================================================================

-- VIEW 1: Horizontal View (Memfilter baris/row)
CREATE VIEW view_active_users AS 
SELECT * FROM users WHERE id > 5;

-- VIEW 2: Vertical View (Memfilter kolom spesifik)
CREATE VIEW view_public_course_info AS
SELECT id, title, description FROM courses;

-- VIEW 3: View Inside View dengan WITH CHECK OPTION
CREATE VIEW view_all_scores AS
SELECT id, user_id, quiz_id, score FROM user_quiz_results WHERE score >= 0;

CREATE VIEW view_top_scores AS
SELECT id, user_id, quiz_id, score FROM view_all_scores WHERE score >= 80
WITH CASCADED CHECK OPTION;


-- =========================================================================
-- 8. DATABASE SECURITY (Ketentuan 2.f)
-- =========================================================================

-- Drop jika sebelumnya sudah ada
DROP ROLE IF EXISTS 'role_admin', 'role_analyst', 'role_student';
DROP USER IF EXISTS 'admin_app'@'localhost', 'data_analyst'@'localhost', 'student_role'@'localhost';

-- Membuat Role
CREATE ROLE 'role_admin';
CREATE ROLE 'role_analyst';
CREATE ROLE 'role_student';

-- Membuat User
CREATE USER 'admin_app'@'localhost' IDENTIFIED BY 'admin123';
CREATE USER 'data_analyst'@'localhost' IDENTIFIED BY 'analyst123';
CREATE USER 'student_role'@'localhost' IDENTIFIED BY 'student123';

-- Mengisi Privilege
-- 1. Admin bisa akses semua tabel & views
GRANT ALL PRIVILEGES ON ruangbelajar_db.* TO 'role_admin';
-- 2. Analyst bisa SELECT tabel dan EXECUTE procedure
GRANT SELECT, EXECUTE ON ruangbelajar_db.* TO 'role_analyst';
-- 3. Student hanya bisa SELECT satu view saja
GRANT SELECT ON ruangbelajar_db.view_public_course_info TO 'role_student';

-- Menetapkan Role kepada User
GRANT 'role_admin' TO 'admin_app'@'localhost';
GRANT 'role_analyst' TO 'data_analyst'@'localhost';
GRANT 'role_student' TO 'student_role'@'localhost';

-- Set default role (wajib agar aktif saat login pada MySQL 8.0+)
SET DEFAULT ROLE 'role_admin' TO 'admin_app'@'localhost';
SET DEFAULT ROLE 'role_analyst' TO 'data_analyst'@'localhost';
SET DEFAULT ROLE 'role_student' TO 'student_role'@'localhost';
FLUSH PRIVILEGES;

-- =========================================================================
-- SCRIPT TAMBAHAN UNTUK DEMONSTRASI (Bisa dijalankan di SQL Client)
-- =========================================================================
/*
-- Demo Function:
SELECT get_total_users();
SELECT u.full_name, q.title, get_user_score_by_quiz(u.id, q.id) AS final_score 
FROM users u 
JOIN quizzes q ON 1=1 LIMIT 5;

-- Demo Procedure:
CALL update_user_password(1, 'password_baru123');

-- Demo Trigger UPDATE (Score akan dicegah turun dari 80 ke 50, score tetap 80)
UPDATE user_quiz_results SET score = 50 WHERE user_id = 1 AND quiz_id = 1;
SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 5;

-- Demo View INSERT (Akan gagal karena score < 80 melanggar WITH CHECK OPTION)
-- INSERT INTO view_top_scores (user_id, quiz_id, score) VALUES (1, 3, 70);

-- Demo EXPLAIN Index
EXPLAIN SELECT * FROM activity_logs WHERE user_id = 1 AND action_type = 'LOGIN';
*/
