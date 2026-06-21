const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sajikan folder uploads sebagai static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Konfigurasi Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Endpoint upload gambar
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Kembalikan URL gambar
    const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
});

// Get all courses with materials count
app.get('/api/courses', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT c.*, COUNT(m.id) as materials_count 
            FROM courses c
            LEFT JOIN materials m ON c.id = m.course_id
            GROUP BY c.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific course
app.get('/api/courses/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new course
app.post('/api/courses', async (req, res) => {
    try {
        const { title, description, thumbnail_url } = req.body;
        const [result] = await db.query(
            'INSERT INTO courses (title, description, thumbnail_url) VALUES (?, ?, ?)',
            [title, description, thumbnail_url]
        );
        res.status(201).json({ id: result.insertId, title, description, thumbnail_url });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a course
app.put('/api/courses/:id', async (req, res) => {
    try {
        const { title, description, thumbnail_url } = req.body;
        const [result] = await db.query(
            'UPDATE courses SET title = ?, description = ?, thumbnail_url = ? WHERE id = ?',
            [title, description, thumbnail_url, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a course
app.delete('/api/courses/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM courses WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// --- MATERIALS API ---

// Get all materials for a specific course
app.get('/api/courses/:courseId/materials', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM materials WHERE course_id = ? ORDER BY order_num ASC',
            [req.params.courseId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific material
app.get('/api/materials/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM materials WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching material:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new material
app.post('/api/materials', async (req, res) => {
    try {
        const { course_id, title, video_url, description, content } = req.body;
        
        // Auto-increment order_num based on existing materials
        const [rows] = await db.query('SELECT MAX(order_num) as max_order FROM materials WHERE course_id = ?', [course_id]);
        const nextOrderNum = (rows[0].max_order || 0) + 1;

        const [result] = await db.query(
            'INSERT INTO materials (course_id, title, video_url, description, content, order_num) VALUES (?, ?, ?, ?, ?, ?)',
            [course_id, title, video_url, description, content, nextOrderNum]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error('Error creating material:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a material
app.put('/api/materials/:id', async (req, res) => {
    try {
        const { title, video_url, description, content } = req.body;
        const [result] = await db.query(
            'UPDATE materials SET title = ?, video_url = ?, description = ?, content = ? WHERE id = ?',
            [title, video_url, description, content, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.json({ message: 'Material updated successfully' });
    } catch (error) {
        console.error('Error updating material:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a material
app.delete('/api/materials/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM materials WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.json({ message: 'Material deleted successfully' });
    } catch (error) {
        console.error('Error deleting material:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- USERS API ---
// Register new user
app.post('/api/users/register', async (req, res) => {
    try {
        const { full_name, phone_number, birth_date, email, password } = req.body;
        
        // Cek jika email sudah terdaftar
        const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Email sudah terdaftar' });
        }

        const [result] = await db.query(
            'INSERT INTO users (full_name, phone_number, birth_date, email, password) VALUES (?, ?, ?, ?, ?)',
            [full_name, phone_number, birth_date, email, password]
        );
        
        res.status(201).json({ id: result.insertId, message: 'User berhasil didaftarkan' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login user
app.post('/api/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Cek email dulu
        const [users] = await db.query('SELECT id, full_name, email, password FROM users WHERE email = ?', [username]);
        
        if (users.length === 0) {
            return res.status(401).json({ error: 'Email salah' });
        }
        
        const user = users[0];
        if (user.password !== password) {
            return res.status(401).json({ error: 'Password salah' });
        }
        
        // Remove password from response
        delete user.password;
        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
