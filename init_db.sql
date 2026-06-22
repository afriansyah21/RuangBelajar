DROP DATABASE IF EXISTS ruangbelajar_db;
CREATE DATABASE IF NOT EXISTS ruangbelajar_db;
USE ruangbelajar_db;

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    birth_date DATE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    options JSON NOT NULL,
    correct_answer_index INT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_material_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    material_id INT NOT NULL,
    is_completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE,
    UNIQUE KEY (user_id, material_id)
);

CREATE TABLE IF NOT EXISTS user_quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Hapus dummy data (clear table)
-- Truncate causes foreign key constraint issues. Better to delete.
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE user_quiz_results;
TRUNCATE TABLE user_material_progress;
TRUNCATE TABLE quiz_questions;
TRUNCATE TABLE quizzes;
TRUNCATE TABLE courses;
TRUNCATE TABLE materials;
SET FOREIGN_KEY_CHECKS = 1;

-- 3 Kelas
INSERT INTO courses (id, title, description, thumbnail_url) VALUES 
(1, '01. Front End', 'Pelajari dasar pembuatan antarmuka web yang interaktif.', 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop'),
(2, '02. Back End', 'Memahami logika server, database, dan API.', 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=2000&auto=format&fit=crop'),
(3, '03. UI/UX', 'Pelajari konsep dasar pengalaman pengguna dan antarmuka visual.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuATLUS9ZsLTzLYfXbZdYGKavScc8BlMRp9qCnP89IjwiqpDd_aJQNIzAQpHZmjmqlZ1A-RnztBolomZB0FnsL3LzWHG9WTYrcwoPopEsfG8QaAjAFj3rpXPL-mphWLa_SLv_yJ6tVAliVH-xIrYu0ctxJvNQ_DRvWwf8gDmlu0euYoIJxF2C3IWg1wkYRZ1QhKX6fEIzmtlFkp1Iw3mdgP99pgI82DafxEjBpq0ggqEKcJGYUVWg-GTiPbCOzWfkH0_JQANvDQeIyss');

-- Masing-masing 3 materi
INSERT INTO materials (course_id, title) VALUES
(1, 'Pengenalan HTML5'), (1, 'CSS Dasar & Flexbox'), (1, 'JavaScript DOM Manipulation'),
(2, 'Node.js & Express Dasar'), (2, 'Pengenalan Database SQL'), (2, 'Membuat REST API'),
(3, 'Prinsip Dasar Desain UI'), (3, 'Pengenalan Figma'), (3, 'Wireframing & Prototyping');

-- Kuis untuk setiap kelas
INSERT INTO quizzes (id, course_id, title) VALUES
(1, 1, 'Kuis Front End Dasar'),
(2, 2, 'Kuis Back End Dasar'),
(3, 3, 'Kuis UI/UX Dasar');

-- Pertanyaan Kuis
INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer_index) VALUES
(1, 'Apa kepanjangan dari HTML?', '["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"]', 0),
(1, 'Properti CSS apa yang digunakan untuk mengubah warna teks?', '["text-color", "color", "font-color"]', 1),
(2, 'Node.js menggunakan bahasa pemrograman apa?', '["Python", "Java", "JavaScript"]', 2),
(2, 'Apa perintah untuk menginisialisasi proyek Node.js?', '["npm start", "npm init", "node init"]', 1),
(3, 'Apa kepanjangan dari UI?', '["User Identity", "User Interface", "User Integration"]', 1),
(3, 'Software apa yang populer digunakan untuk desain UI/UX?', '["Photoshop", "Excel", "Figma"]', 2);
