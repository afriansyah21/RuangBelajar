require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./db');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Konfigurasi Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary storage — upload langsung ke cloud, tidak perlu disk lokal
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ruangbelajar',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [{ width: 800, crop: 'limit', quality: 'auto' }]
    }
});
const upload = multer({ storage });

// Endpoint root agar tidak muncul Cannot GET /
app.get('/', (req, res) => {
    res.send('✅ RuangBelajar API Server is running successfully!');
});

// Endpoint warmup — ping dari frontend agar backend tidak cold start
app.get('/api/warmup', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.json({ status: 'warm', time: new Date().toISOString() });
    } catch (e) {
        res.json({ status: 'warming', error: e.message, code: e.code, host: process.env.DB_HOST, port: process.env.DB_PORT, db: process.env.DB_NAME });
    }
});


// Endpoint upload gambar — menggunakan Cloudinary (bukan disk lokal)
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Cloudinary otomatis menyimpan file dan mengembalikan URL publik
    const imageUrl = req.file.path;
    res.json({ url: imageUrl });
});

// Helper: ganti URL gambar yang masih localhost dengan placeholder
const DEFAULT_COURSE_IMG = 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop';
const DEFAULT_QUIZ_IMG = 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800&auto=format&fit=crop';

function fixImageUrl(url, defaultImg) {
    if (!url) return defaultImg;
    if (url.includes('localhost') || url.includes('127.0.0.1')) return defaultImg;
    return url;
}

// Get all courses with materials count
app.get('/api/courses', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT c.*, COUNT(m.id) as materials_count 
            FROM courses c
            LEFT JOIN materials m ON c.id = m.course_id
            GROUP BY c.id
        `);
        const fixed = rows.map(r => ({ ...r, thumbnail_url: fixImageUrl(r.thumbnail_url, DEFAULT_COURSE_IMG) }));
        res.json(fixed);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific course and its materials
app.get('/api/courses/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        
        const [materials] = await db.query('SELECT id, title, youtube_link, short_description, summary, created_at FROM materials WHERE course_id = ? ORDER BY id ASC', [req.params.id]);
        
        res.json({
            ...rows[0],
            thumbnail_url: fixImageUrl(rows[0].thumbnail_url, DEFAULT_COURSE_IMG),
            materials
        });
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
            'SELECT * FROM materials WHERE course_id = ? ORDER BY id ASC',
            [req.params.courseId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific material
app.get('/api/admin/materials/:id', async (req, res) => {
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
app.post('/api/admin/courses/:courseId/materials', async (req, res) => {
    try {
        const course_id = req.params.courseId;
        const { title, youtube_link, short_description, summary } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO materials (course_id, title, youtube_link, short_description, summary) VALUES (?, ?, ?, ?, ?)',
            [course_id, title, youtube_link, short_description, summary]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error('Error creating material:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a material
app.put('/api/admin/materials/:id', async (req, res) => {
    try {
        const { title, youtube_link, short_description, summary } = req.body;
        const [result] = await db.query(
            'UPDATE materials SET title = ?, youtube_link = ?, short_description = ?, summary = ? WHERE id = ?',
            [title, youtube_link, short_description, summary, req.params.id]
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
app.delete('/api/admin/materials/:id', async (req, res) => {
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

// --- PUBLIC API ---
app.get('/api/public/landing-stats', async (req, res) => {
    try {
        const [[{ total_users }]] = await db.query('SELECT COUNT(*) AS total_users FROM users');
        const [[{ total_materials }]] = await db.query('SELECT COUNT(*) AS total_materials FROM materials');
        
        res.json({
            totalUsers: total_users || 0,
            totalMaterials: total_materials || 0
        });
    } catch (error) {
        console.error('Error fetching landing stats:', error);
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

// Get all users for admin
app.get('/api/admin/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, full_name, email, birth_date, created_at FROM users ORDER BY created_at DESC');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login user
app.post('/api/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username dan password diperlukan' });
        }
        const [users] = await db.query('SELECT id, full_name, email, password, phone_number, birth_date, profile_picture FROM users WHERE email = ?', [username]);
        
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
        // Sementara tampilkan detail error untuk debugging
        res.status(500).json({ error: 'Internal Server Error', detail: error.message, code: error.code });
    }
});

// --- PROGRESS & QUIZ ROUTES ---

// 1. Get User Progress Summary
app.get('/api/progress/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Material Progress
        const [totalMaterials] = await db.query('SELECT COUNT(*) as count FROM materials');
        const [completedMaterials] = await db.query('SELECT COUNT(*) as count FROM user_material_progress WHERE user_id = ? AND is_completed = TRUE', [userId]);
        
        // Quiz Progress
        const [totalQuizzes] = await db.query('SELECT COUNT(*) as count FROM quizzes');
        const [completedQuizzes] = await db.query('SELECT COUNT(DISTINCT quiz_id) as count FROM user_quiz_results WHERE user_id = ?', [userId]);
        
        // Average Score
        const [avgScoreResult] = await db.query('SELECT AVG(score) as avg_score FROM user_quiz_results WHERE user_id = ?', [userId]);
        
        res.json({
            material: {
                completed: completedMaterials[0].count,
                total: totalMaterials[0].count,
                percentage: totalMaterials[0].count > 0 ? Math.round((completedMaterials[0].count / totalMaterials[0].count) * 100) : 0
            },
            quiz: {
                completed: completedQuizzes[0].count,
                total: totalQuizzes[0].count,
                percentage: totalQuizzes[0].count > 0 ? Math.round((completedQuizzes[0].count / totalQuizzes[0].count) * 100) : 0
            },
            averageScore: avgScoreResult[0].avg_score ? parseFloat(avgScoreResult[0].avg_score).toFixed(1) : 0
        });
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. Mark Material as Completed
app.post('/api/progress/material', async (req, res) => {
    try {
        const { userId, materialId } = req.body;
        await db.query(
            'INSERT IGNORE INTO user_material_progress (user_id, material_id, is_completed) VALUES (?, ?, TRUE)',
            [userId, materialId]
        );
        res.json({ message: 'Progress saved' });
    } catch (error) {
        console.error('Error saving progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 3. Get Quizzes by Course
app.get('/api/quizzes/course/:courseId', async (req, res) => {
    try {
        const [quizzes] = await db.query('SELECT id, title, created_at FROM quizzes WHERE course_id = ?', [req.params.courseId]);
        res.json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 4. Get Quiz Details & Question Groups
app.get('/api/quizzes/:quizId', async (req, res) => {
    try {
        const [quiz] = await db.query('SELECT * FROM quizzes WHERE id = ?', [req.params.quizId]);
        if (quiz.length === 0) return res.status(404).json({ error: 'Quiz not found' });
        
        const [groups] = await db.query('SELECT * FROM quiz_question_groups WHERE quiz_id = ?', [req.params.quizId]);
        const [questions] = await db.query('SELECT id, group_id, question_text, options, correct_answer_index, explanation FROM quiz_questions WHERE quiz_id = ?', [req.params.quizId]);
        
        // Parse options JSON
        const parsedQuestions = questions.map(q => ({
            ...q,
            options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
        }));
        
        const groupsWithQuestions = groups.map(g => ({
            ...g,
            questions: parsedQuestions.filter(q => q.group_id === g.id)
        }));
        
        res.json({
            ...quiz[0],
            groups: groupsWithQuestions
        });
    } catch (error) {
        console.error('Error fetching quiz details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 5. Submit Quiz
app.post('/api/quizzes/:quizId/submit', async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const { userId, answers } = req.body; // answers is object: { questionId: selectedIndex }
        
        const [questions] = await db.query('SELECT id, correct_answer_index FROM quiz_questions WHERE quiz_id = ?', [quizId]);
        
        if (questions.length === 0) return res.status(400).json({ error: 'Quiz has no questions' });
        
        let correctCount = 0;
        questions.forEach(q => {
            if (answers[q.id] !== undefined && answers[q.id] === q.correct_answer_index) {
                correctCount++;
            }
        });
        
        const score = Math.round((correctCount / questions.length) * 100);
        
        await db.query(
            'INSERT INTO user_quiz_results (user_id, quiz_id, score) VALUES (?, ?, ?)',
            [userId, quizId, score]
        );
        
        res.json({
            score,
            correctAnswers: correctCount,
            totalQuestions: questions.length
        });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 5b. Submit Quiz Group
app.post('/api/question-groups/:groupId/submit', async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const { userId, answers } = req.body;
        
        const [groups] = await db.query('SELECT quiz_id FROM quiz_question_groups WHERE id = ?', [groupId]);
        if (groups.length === 0) return res.status(404).json({ error: 'Group not found' });
        const quizId = groups[0].quiz_id;

        const [questions] = await db.query('SELECT * FROM quiz_questions WHERE group_id = ?', [groupId]);
        if (questions.length === 0) return res.status(400).json({ error: 'Group has no questions' });
        
        let correctCount = 0;
        const results = [];

        questions.forEach(q => {
            const isCorrect = answers[q.id] !== undefined && parseInt(answers[q.id]) === q.correct_answer_index;
            if (isCorrect) correctCount++;
            
            results.push({
                question_id: q.id,
                question_text: q.question_text,
                user_answer_index: answers[q.id] !== undefined ? parseInt(answers[q.id]) : null,
                correct_answer_index: q.correct_answer_index,
                is_correct: isCorrect,
                explanation: q.explanation,
                options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
            });
        });
        
        const score = Math.round((correctCount / questions.length) * 100);
        const answersJson = JSON.stringify({
            details: results,
            correctAnswers: correctCount,
            totalQuestions: questions.length
        });
        
        await db.query(
            'INSERT INTO user_quiz_results (user_id, quiz_id, group_id, score, answers_json) VALUES (?, ?, ?, ?, ?)',
            [userId, quizId, groupId, score, answersJson]
        );
        
        res.json({
            score,
            correctAnswers: correctCount,
            totalQuestions: questions.length,
            details: results
        });
    } catch (error) {
        console.error('Error submitting group quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/user-quiz-results/:groupId/:userId', async (req, res) => {
    try {
        const { groupId, userId } = req.params;
        const [rows] = await db.query(
            'SELECT score, answers_json FROM user_quiz_results WHERE group_id = ? AND user_id = ? ORDER BY created_at DESC LIMIT 1',
            [groupId, userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Result not found' });
        }

        const data = rows[0];
        let answersData = null;
        if (data.answers_json) {
            answersData = JSON.parse(data.answers_json);
        }

        res.json({
            score: data.score,
            details: answersData ? answersData.details : [],
            correctAnswers: answersData ? answersData.correctAnswers : 0,
            totalQuestions: answersData ? answersData.totalQuestions : 0
        });
    } catch (error) {
        console.error('Error fetching user quiz results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/users/:userId/completed-groups', async (req, res) => {
    try {
        const userId = req.params.userId;
        const [rows] = await db.query('SELECT DISTINCT group_id FROM user_quiz_results WHERE user_id = ? AND group_id IS NOT NULL', [userId]);
        res.json(rows.map(r => r.group_id));
    } catch (error) {
        console.error('Error fetching completed groups:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- ADMIN QUIZ ROUTES ---

// 1. Get All Quizzes
app.get('/api/admin/quizzes', async (req, res) => {
    try {
        const query = `
            SELECT q.id, q.title as quiz_title, c.title as course_title, q.description, q.thumbnail_url
            FROM quizzes q
            JOIN courses c ON q.course_id = c.id
            ORDER BY q.created_at DESC
        `;
        const [quizzes] = await db.query(query);
        const fixed = quizzes.map(q => ({ ...q, thumbnail_url: fixImageUrl(q.thumbnail_url, DEFAULT_QUIZ_IMG) }));
        res.json(fixed);
    } catch (error) {
        console.error('Error fetching admin quizzes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. Create Quiz
app.post('/api/admin/quizzes', async (req, res) => {
    try {
        const { course_id, title, description, thumbnail_url } = req.body;
        if (!course_id || !title) return res.status(400).json({ error: 'Course ID and Title are required' });
        
        const [result] = await db.query(
            'INSERT INTO quizzes (course_id, title, description, thumbnail_url) VALUES (?, ?, ?, ?)',
            [course_id, title, description || null, thumbnail_url || null]
        );
        res.status(201).json({ id: result.insertId, message: 'Quiz created successfully' });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 3. Update Quiz
app.put('/api/admin/quizzes/:id', async (req, res) => {
    try {
        const { course_id, title, description, thumbnail_url } = req.body;
        await db.query(
            'UPDATE quizzes SET course_id = ?, title = ?, description = ?, thumbnail_url = ? WHERE id = ?',
            [course_id, title, description || null, thumbnail_url || null, req.params.id]
        );
        res.json({ message: 'Quiz updated successfully' });
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 4. Delete Quiz
app.delete('/api/admin/quizzes/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM quizzes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 5. Get Question Group Details
app.get('/api/admin/question-groups/:groupId', async (req, res) => {
    try {
        const [groups] = await db.query('SELECT * FROM quiz_question_groups WHERE id = ?', [req.params.groupId]);
        if (groups.length === 0) return res.status(404).json({ error: 'Group not found' });
        
        const [questions] = await db.query('SELECT * FROM quiz_questions WHERE group_id = ?', [req.params.groupId]);
        const parsedQuestions = questions.map(q => ({
            ...q,
            options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
        }));
        
        res.json({
            ...groups[0],
            questions: parsedQuestions
        });
    } catch (error) {
        console.error('Error fetching group details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 6. Create Question Group
app.post('/api/admin/quizzes/:quizId/question-groups', async (req, res) => {
    let connection;
    try {
        const quizId = req.params.quizId;
        const { title, questions } = req.body;

        if (!title) return res.status(400).json({ error: 'Group title is required' });
        if (!Array.isArray(questions)) return res.status(400).json({ error: 'Questions must be an array' });

        connection = await db.getConnection();
        await connection.beginTransaction();

        const [groupRes] = await connection.query('INSERT INTO quiz_question_groups (quiz_id, title) VALUES (?, ?)', [quizId, title]);
        const groupId = groupRes.insertId;

        for (const q of questions) {
            await connection.query(
                'INSERT INTO quiz_questions (quiz_id, group_id, question_text, options, correct_answer_index, explanation) VALUES (?, ?, ?, ?, ?, ?)',
                [quizId, groupId, q.question_text, JSON.stringify(q.options), q.correct_answer_index, q.explanation || null]
            );
        }

        await connection.commit();
        res.status(201).json({ message: 'Group created successfully', groupId });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Error creating question group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (connection) connection.release();
    }
});

// 7. Update Question Group
app.put('/api/admin/question-groups/:groupId', async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const { title, questions } = req.body;

        if (!title) return res.status(400).json({ error: 'Group title is required' });
        if (!Array.isArray(questions)) return res.status(400).json({ error: 'Questions must be an array' });

        await db.query('UPDATE quiz_question_groups SET title = ? WHERE id = ?', [title, groupId]);
        await db.query('DELETE FROM quiz_questions WHERE group_id = ?', [groupId]);

        const [group] = await db.query('SELECT quiz_id FROM quiz_question_groups WHERE id = ?', [groupId]);
        if (group.length > 0) {
            const quizId = group[0].quiz_id;
            for (const q of questions) {
                await db.query(
                    'INSERT INTO quiz_questions (quiz_id, group_id, question_text, options, correct_answer_index, explanation) VALUES (?, ?, ?, ?, ?, ?)',
                    [quizId, groupId, q.question_text, JSON.stringify(q.options), q.correct_answer_index, q.explanation || null]
                );
            }
        }

        res.json({ message: 'Group updated successfully' });
    } catch (error) {
        console.error('Error updating question group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 8. Delete Question Group
app.delete('/api/admin/question-groups/:groupId', async (req, res) => {
    try {
        await db.query('DELETE FROM quiz_question_groups WHERE id = ?', [req.params.groupId]);
        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error('Error deleting question group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// --- PAYMENT METHODS API ---

// Get all payment methods
app.get('/api/admin/payment-methods', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM payment_methods ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Bulk update payment methods (delete all then insert new)
app.post('/api/admin/payment-methods/bulk', async (req, res) => {
    try {
        const { methods } = req.body; // Expecting { methods: [{type, bank_name, account_number, image_data}] }
        
        if (!Array.isArray(methods)) {
            return res.status(400).json({ error: 'Methods must be an array' });
        }

        // Delete all existing methods
        await db.query('DELETE FROM payment_methods');

        // Insert new methods
        for (const m of methods) {
            await db.query(
                'INSERT INTO payment_methods (type, bank_name, account_number, image_data) VALUES (?, ?, ?, ?)',
                [m.type, m.bank_name || null, m.account_number || null, m.image_data || null]
            );
        }

        res.json({ message: 'Payment methods updated successfully' });
    } catch (error) {
        console.error('Error updating payment methods:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// --- DONATIONS API ---

// Add new donation
app.post('/api/admin/donations', async (req, res) => {
    try {
        const { donator_name, donation_method, donation_date, amount } = req.body;
        if (!donator_name || !donation_method || !donation_date || !amount) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const [result] = await db.query(
            'INSERT INTO donations (donator_name, donation_method, donation_date, amount) VALUES (?, ?, ?, ?)',
            [donator_name, donation_method, donation_date, amount]
        );

        res.status(201).json({ id: result.insertId, message: 'Donation saved successfully' });
    } catch (error) {
        console.error('Error saving donation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all donations
app.get('/api/admin/donations', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM donations ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get single donation
app.get('/api/admin/donations/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM donations WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Donation not found' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching donation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update donation
app.put('/api/admin/donations/:id', async (req, res) => {
    try {
        const { donator_name, donation_method, donation_date, amount } = req.body;
        if (!donator_name || !donation_method || !donation_date || !amount) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        await db.query(
            'UPDATE donations SET donator_name = ?, donation_method = ?, donation_date = ?, amount = ? WHERE id = ?',
            [donator_name, donation_method, donation_date, amount, req.params.id]
        );
        res.json({ message: 'Donation updated successfully' });
    } catch (error) {
        console.error('Error updating donation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete donation
app.delete('/api/admin/donations/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM donations WHERE id = ?', [req.params.id]);
        res.json({ message: 'Donation deleted successfully' });
    } catch (error) {
        console.error('Error deleting donation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- RECENT QUIZZES API ---
app.get('/api/users/:id/recent-quizzes', async (req, res) => {
    try {
        const userId = req.params.id;
        const [results] = await db.query(`
            SELECT q.title as quiz_title, c.title as course_title, uqr.score, uqr.created_at
            FROM user_quiz_results uqr
            JOIN quizzes q ON uqr.quiz_id = q.id
            JOIN courses c ON q.course_id = c.id
            WHERE uqr.user_id = ?
            ORDER BY uqr.created_at DESC
            LIMIT 5
        `, [userId]);
        res.json(results);
    } catch (error) {
        console.error('Error fetching recent quizzes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- USER QUIZ PROGRESS API ---
app.get('/api/users/:id/quiz-progress', async (req, res) => {
    try {
        const userId = req.params.id;
        const [results] = await db.query(`
            SELECT q.title as quiz_title, q.description as quiz_description, c.title as course_title, COALESCE(uqr.score, 0) as score 
            FROM quizzes q 
            LEFT JOIN courses c ON q.course_id = c.id 
            LEFT JOIN (
                SELECT quiz_id, MAX(score) as score
                FROM user_quiz_results
                WHERE user_id = ?
                GROUP BY quiz_id
            ) uqr ON q.id = uqr.quiz_id
            ORDER BY DATE(q.created_at) DESC, q.id ASC
        `, [userId]);
        res.json(results);
    } catch (error) {
        console.error('Error fetching quiz progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- USER PROFILE STATS API ---
app.get('/api/users/:id/profile-stats', async (req, res) => {
    try {
        const userId = req.params.id;
        const [totalQuizzesResult] = await db.query(`SELECT COUNT(*) as count FROM quiz_question_groups`);
        const totalQuizzes = totalQuizzesResult[0].count || 0;
        
        const [completedQuizzes] = await db.query(`SELECT COUNT(DISTINCT group_id) as count FROM user_quiz_results WHERE user_id = ?`, [userId]);
        
        let averageScore = 0;
        if (totalQuizzes > 0) {
            const [sumScoreResult] = await db.query(`
                SELECT SUM(max_score) as total_score 
                FROM (
                    SELECT MAX(score) as max_score 
                    FROM user_quiz_results 
                    WHERE user_id = ? 
                    GROUP BY group_id
                ) as t
            `, [userId]);
            const totalScore = sumScoreResult[0].total_score || 0;
            averageScore = totalScore / totalQuizzes;
        }
        
        res.json({
            total_quizzes: totalQuizzes,
            completed_quizzes: completedQuizzes[0].count,
            average_score: averageScore
        });
    } catch (error) {
        console.error('Error fetching profile stats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- USER PROFILE API ---
app.put('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { full_name, birth_date, phone_number, profile_picture } = req.body;
        
        let updateQuery = 'UPDATE users SET full_name = ?, birth_date = ?, phone_number = ?';
        let queryParams = [full_name, birth_date, phone_number];
        
        if (profile_picture !== undefined && profile_picture !== null) {
            updateQuery += ', profile_picture = ?';
            queryParams.push(profile_picture);
        }
        
        updateQuery += ' WHERE id = ?';
        queryParams.push(userId);
        
        await db.query(updateQuery, queryParams);
        
        // Fetch updated user to return
        const [users] = await db.query('SELECT id, full_name, email, birth_date, phone_number, profile_picture, created_at FROM users WHERE id = ?', [userId]);
        if (users.length > 0) {
            res.json(users[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/users/:id/password', async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentPassword, newPassword } = req.body;
        
        const [users] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const user = users[0];
        if (user.password !== currentPassword) {
            return res.status(401).json({ error: 'Password saat ini salah' });
        }
        
        await db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId]);
        res.json({ message: 'Password berhasil diubah' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/users/:id/verify-password', async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentPassword } = req.body;
        
        const [users] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const user = users[0];
        if (user.password !== currentPassword) {
            return res.status(401).json({ error: 'Password saat ini salah' });
        }
        
        res.json({ message: 'Password benar' });
    } catch (error) {
        console.error('Error verifying password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- FEEDBACK API ---
app.post('/api/feedback', async (req, res) => {
    try {
        const { subject, message, user_name } = req.body;
        if (!subject || !message) {
            return res.status(400).json({ error: 'Subject and message are required' });
        }
        const [result] = await db.query(
            'INSERT INTO feedbacks (user_name, subject, message) VALUES (?, ?, ?)',
            [user_name || 'Pengguna', subject, message]
        );
        res.status(201).json({ id: result.insertId, message: 'Feedback sent successfully' });
    } catch (error) {
        console.error('Error adding feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/admin/feedbacks', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM feedbacks ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- DASHBOARD API ---
app.get('/api/admin/dashboard-stats', async (req, res) => {
    try {
        const [[{ total_users }]] = await db.query('SELECT COUNT(*) AS total_users FROM users');
        const [[{ total_donations }]] = await db.query('SELECT SUM(amount) AS total_donations FROM donations');
        const [[{ total_courses }]] = await db.query('SELECT COUNT(*) AS total_courses FROM courses');
        const [[{ avg_score }]] = await db.query('SELECT AVG(score) AS avg_score FROM user_quiz_results');
        
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const prevMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

        // User stats current vs prev month
        const [[{ cnt: users_current_month }]] = await db.query('SELECT COUNT(*) as cnt FROM users WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?', [currentMonth, currentYear]);
        const [[{ cnt: users_prev_month }]] = await db.query('SELECT COUNT(*) as cnt FROM users WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?', [prevMonth, prevMonthYear]);
        
        let usersGrowth = 0;
        if (users_prev_month > 0) {
            usersGrowth = ((users_current_month - users_prev_month) / users_prev_month) * 100;
        } else if (users_current_month > 0) {
            usersGrowth = 100;
        }

        // Donation stats current vs prev month
        const [[{ sum: donations_current_month }]] = await db.query('SELECT SUM(amount) as sum FROM donations WHERE MONTH(donation_date) = ? AND YEAR(donation_date) = ?', [currentMonth, currentYear]);
        const [[{ sum: donations_prev_month }]] = await db.query('SELECT SUM(amount) as sum FROM donations WHERE MONTH(donation_date) = ? AND YEAR(donation_date) = ?', [prevMonth, prevMonthYear]);

        const curDonations = donations_current_month || 0;
        const prevDonations = donations_prev_month || 0;

        let donationsGrowth = 0;
        if (prevDonations > 0) {
            donationsGrowth = ((curDonations - prevDonations) / prevDonations) * 100;
        } else if (curDonations > 0) {
            donationsGrowth = 100;
        }
        
        // Monthly Growth: Jan to Dec for the current year
        const [monthlyRaw] = await db.query(`SELECT DATE_FORMAT(created_at, '%m') as month, COUNT(*) as count FROM users WHERE YEAR(created_at) = ? GROUP BY month`, [currentYear]);
        const monthlyGrowth = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
        for(let i=0; i<12; i++) {
            const found = monthlyRaw.find(m => parseInt(m.month, 10) === i+1);
            monthlyGrowth.push({
                label: monthNames[i],
                count: found ? found.count : 0
            });
        }

        // Yearly Growth: Earliest to Latest
        const [[yearsData]] = await db.query(`SELECT MIN(YEAR(created_at)) as min_year, MAX(YEAR(created_at)) as max_year FROM users`);
        const startYear = yearsData && yearsData.min_year ? yearsData.min_year : currentYear;
        const endYear = yearsData && yearsData.max_year ? yearsData.max_year : currentYear;
        const [yearlyRaw] = await db.query(`SELECT YEAR(created_at) as year, COUNT(*) as count FROM users GROUP BY year`);
        const yearlyGrowth = [];
        for(let y = startYear; y <= endYear; y++) {
            const found = yearlyRaw.find(yr => parseInt(yr.year, 10) === y);
            yearlyGrowth.push({
                label: y.toString(),
                count: found ? found.count : 0
            });
        }

        const [recentDonations] = await db.query('SELECT donator_name, donation_method, amount, created_at FROM donations ORDER BY created_at DESC LIMIT 5');

        res.json({
            totalUsers: total_users || 0,
            totalDonations: total_donations || 0,
            totalCourses: total_courses || 0,
            avgQuizScore: Math.round((avg_score || 0) * 10) / 10,
            usersGrowth: Math.round(usersGrowth * 10) / 10,
            donationsGrowth: Math.round(donationsGrowth * 10) / 10,
            monthlyGrowth,
            yearlyGrowth,
            recentDonations
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;

// Selalu jalankan server kecuali di Vercel (serverless)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Backend server running at http://localhost:${PORT}`);
    });
}

// Export untuk Vercel Serverless (jika masih dipakai)
module.exports = app;
