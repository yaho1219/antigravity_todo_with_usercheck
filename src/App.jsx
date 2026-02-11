import { Routes, Route, Link, useLocation } from 'react-router-dom'
import TodoList from './components/TodoList'
import Signup from './components/Signup'
import Login from './components/Login'
import './App.css'

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">Todo App</div>
        <div className="nav-links">
          {location.pathname !== '/' && <Link to="/" className="nav-link">Home</Link>}
          {location.pathname === '/signup' && <Link to="/login" className="nav-link">Login</Link>}
          {location.pathname === '/login' && <Link to="/signup" className="nav-link">Sign Up</Link>}
          {location.pathname === '/' && (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
