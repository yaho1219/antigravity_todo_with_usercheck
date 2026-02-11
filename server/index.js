import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

// Helper to read users
const readUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Helper to write users
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Sign Up Endpoint
app.post('/api/signup', (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }

    const users = readUsers();

    if (users.find(user => user.email === email)) {
        return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }

    const newUser = {
        id: Date.now(),
        email,
        password, // In a real app, hash the password!
        name
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: '회원가입 성공!', user: { email: newUser.email, name: newUser.name } });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
