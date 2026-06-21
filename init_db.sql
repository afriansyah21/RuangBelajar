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

-- Hapus dummy data (clear table)
TRUNCATE TABLE materials;
-- Truncate causes foreign key constraint issues. Better to delete.
SET FOREIGN_KEY_CHECKS = 0;
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
