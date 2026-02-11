프로젝트 산출물 문서 (Project Documentation)
1. 프로젝트 개요 (Project Overview)
이 문서는 Todo App의 회원가입 기능 구현에 대한 산출물입니다. React 프론트엔드와 Node.js/Express 백엔드를 연동하여 사용자가 계정을 생성하고 데이터를 저장할 수 있는 기능을 구현했습니다.

주요 기능
회원가입: 이메일, 비밀번호, 이름을 입력받아 신규 사용자를 등록합니다.
데이터 저장: 
users.json
 파일을 사용하여 사용자 정보를 영구적으로 저장합니다.
라우팅: SPA(Single Page Application) 구조로 페이지 간 이동을 처리합니다 (react-router-dom).
유효성 검사: 중복된 이메일 가입 방지 및 필수 필드 입력을 검증합니다.
2. 시스템 아키텍처 (System Architecture)
디렉토리 구조
todo-app/
├── server/                 # 백엔드 (Node.js + Express)
│   ├── users.json          # 사용자 데이터 저장소 (JSON DB)
│   ├── index.js            # 서버 진입점 및 API 엔드포인트
│   └── package.json        # 백엔드 의존성 설정
└── src/                    # 프론트엔드 (React + Vite)
    ├── components/         
    │   ├── Signup.jsx      # 회원가입 컴포넌트
    │   ├── Login.jsx       # 로그인 컴포넌트
    │   └── TodoList.jsx    # Todo 리스트 컴포넌트
    ├── App.jsx             # 라우팅 및 레이아웃 설정
    └── main.jsx            # 앱 진입점
3. 핵심 코드 설명 (Key Code Explanation)
3.1 백엔드: 회원가입 API (
server/index.js
)
/api/signup 엔드포인트는 클라이언트로부터 받은 회원 정보를 검증하고 저장합니다.

javascript
// server/index.js
// ... (생략)
// 회원가입 엔드포인트
app.post('/api/signup', (req, res) => {
  const { email, password, name } = req.body;
  // 1. 필수 필드 검증
  if (!email || !password || !name) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }
  const users = readUsers();
  // 2. 이메일 중복 확인
  if (users.find(user => user.email === email)) {
    return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
  }
  // 3. 사용자 정보 저장
  const newUser = {
    id: Date.now(),
    email,
    password, // *주의: 실제 서비스에서는 비밀번호를 해싱해야 합니다.
    name
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ message: '회원가입 성공!', user: { email: newUser.email, name: newUser.name } });
});
3.2 프론트엔드: 회원가입 폼 (
src/components/Signup.jsx
)
fetch API를 사용하여 백엔드와 통신하며, 성공 시 로그인 페이지로 이동합니다.

javascript
// src/components/Signup.jsx
// ... (생략)
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    // 1. 백엔드 API 호출 (포트 5001)
    const response = await fetch('http://localhost:5001/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    // 2. 에러 처리
    if (!response.ok) {
      throw new Error(data.message || '회원가입 실패');
    }
    // 3. 성공 시 처리
    alert('회원가입 성공!');
    navigate('/login'); // 로그인 페이지로 이동
  } catch (err) {
    setError(err.message);
  }
};
3.3 프론트엔드: 라우팅 설정 (
src/App.jsx
)
react-router-dom의 Routes와 Route를 사용하여 페이지 네비게이션을 관리합니다.

javascript
// src/App.jsx
// ... (생략)
function App() {
  const location = useLocation();
  return (
    <div className="app-container">
      {/* 네비게이션 바: 현재 경로에 따라 링크 표시 */}
      <nav className="navbar">
        {/* ... */}
      </nav>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
4. 실행 방법 (How to Run)
백엔드 실행
bash
cd server
npm start
# 서버가 http://localhost:5001 에서 실행됩니다.
프론트엔드 실행
bash
# 새 터미널에서
npm run dev
# 브라우저에서 http://localhost:5173 접속
5. 향후 개선 사항 (Future Improvements)
보안: 비밀번호 해싱(bcrypt 등) 적용 및 JWT 기반 인증 도입.
데이터베이스: JSON 파일 대신 MongoDB 또는 SQL 데이터베이스로 마이그레이션.
사용자 경험: 로딩 인디케이터 추가 및 폼 유효성 검사 강화.
