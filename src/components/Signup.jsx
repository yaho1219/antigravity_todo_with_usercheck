import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Reusing styles for now

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5001/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '회원가입 실패 , 다시 시도해보세요.');
            }

            alert('회원가입 성공!, 이제 로그인을 시도해보세요.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>회원가입</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <button type="submit">가입하기</button>
            </form>
            <p onClick={() => navigate('/login')} className="auth-link">
                이미 계정이 있으신가요? 로그인
            </p>
        </div>
    );
}

export default Signup;
