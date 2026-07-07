-- =====================================================================
-- KUMPULAN FITUR FINAL PROJECT BASIS DATA
-- (TRANSACTION, CURSOR, FUNCTION, PROCEDURE, TRIGGER, VIEW, PERMISSION)
-- =====================================================================
USE ruangbelajar_db;

-- 1. PEMBUATAN TABEL PENDUKUNG UNTUK TRIGGER & CURSOR
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action_type VARCHAR(50) NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    average_score DECIMAL(5,2) DEFAULT 0,
    last_calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================================
-- 1.5 INDEX (15. INDEX)
-- Membuat index untuk mempercepat pencarian email dan nilai
-- =====================================================================
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_quiz_score ON user_quiz_results(score);

-- =====================================================================
-- 2. VIEW & SUBQUERY (16. VIEW, 5. SUBQUERY)
-- Menggabungkan data users, quiz results, dan title dari quizzes
-- =====================================================================
DROP VIEW IF EXISTS vw_user_quiz_summary;
CREATE VIEW vw_user_quiz_summary AS
SELECT 
    u.id AS user_id, 
    u.full_name, 
    u.email,
    (SELECT COUNT(*) FROM user_quiz_results WHERE user_id = u.id) AS total_quizzes_taken, -- Ini adalah SUBQUERY
    q.title AS last_quiz_title,
    r.score,
    r.created_at AS quiz_taken_at
FROM users u
JOIN user_quiz_results r ON u.id = r.user_id
JOIN quizzes q ON r.quiz_id = q.id;

-- =====================================================================
-- 3. FUNCTION (12. FUNCTION)
-- Menghitung grade huruf dari nilai angka
-- =====================================================================
DELIMITER $$
DROP FUNCTION IF EXISTS fn_get_grade$$
CREATE FUNCTION fn_get_grade(score INT) 
RETURNS VARCHAR(2)
DETERMINISTIC
BEGIN
    DECLARE grade VARCHAR(2);
    IF score >= 81 THEN SET grade = 'A';
    ELSEIF score >= 61 THEN SET grade = 'B';
    ELSEIF score >= 41 THEN SET grade = 'C';
    ELSEIF score >= 21 THEN SET grade = 'D';
    ELSE SET grade = 'E';
    END IF;
    RETURN grade;
END$$
DELIMITER ;

-- =====================================================================
-- 4. TRIGGER (14. TRIGGER)
-- Otomatis mencatat setiap ada pendaftaran user baru
-- =====================================================================
DELIMITER $$
DROP TRIGGER IF EXISTS trg_after_user_insert$$
CREATE TRIGGER trg_after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (action_type, table_name, record_id, description)
    VALUES ('INSERT', 'users', NEW.id, CONCAT('User baru mendaftar dengan email: ', NEW.email));
END$$
DELIMITER ;

-- =====================================================================
-- 5. STORED PROCEDURE & CURSOR (13. STORED PROCEDURE, 11. CURSOR)
-- Menghitung rata-rata nilai kuis seluruh user secara looping
-- =====================================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_calculate_all_user_stats$$
CREATE PROCEDURE sp_calculate_all_user_stats()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE curr_user_id INT;
    DECLARE avg_score DECIMAL(5,2);
    
    -- Mendefinisikan CURSOR
    DECLARE user_cursor CURSOR FOR SELECT id FROM users;
    
    -- Handler jika data sudah habis
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN user_cursor;
    
    read_loop: LOOP
        FETCH user_cursor INTO curr_user_id;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Hitung rata-rata nilai user saat ini
        SELECT COALESCE(AVG(score), 0) INTO avg_score 
        FROM user_quiz_results 
        WHERE user_id = curr_user_id;
        
        -- Cek apakah user sudah ada di statistik, jika ya update, jika tidak insert
        IF EXISTS (SELECT 1 FROM user_statistics WHERE user_id = curr_user_id) THEN
            UPDATE user_statistics SET average_score = avg_score WHERE user_id = curr_user_id;
        ELSE
            INSERT INTO user_statistics (user_id, average_score) VALUES (curr_user_id, avg_score);
        END IF;
        
    END LOOP;
    
    CLOSE user_cursor;
END$$
DELIMITER ;

-- =====================================================================
-- 6. PERMISSION (17. PERMISSION / DCL)
-- Memberikan hak akses ke user aplikasi spesifik
-- =====================================================================
-- CREATE USER IF NOT EXISTS 'rb_app_user'@'localhost' IDENTIFIED BY 'password123';
-- GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON ruangbelajar_db.* TO 'rb_app_user'@'localhost';
-- FLUSH PRIVILEGES;
