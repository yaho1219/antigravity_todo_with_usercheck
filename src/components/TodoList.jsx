import { useState } from 'react'
import '../App.css'

function TodoList() {
    const [todos, setTodos] = useState([])
    const [inputValue, setInputValue] = useState('')

    const handleAddTodo = () => {
        if (inputValue.trim() === '') return

        const newTodo = {
            id: Date.now(),
            text: inputValue,
        }

        setTodos([...todos, newTodo])
        setInputValue('')
    }

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo()
        }
    }

    return (
        <div className="todo-wrapper">
            <h1 className="title">📝 투두 리스트</h1>

            <div className="input-section">
                <input
                    type="text"
                    className="todo-input"
                    placeholder="할 일을 입력하세요..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="add-button" onClick={handleAddTodo}>
                    추가
                </button>
            </div>

            <ul className="todo-list">
                {todos.length === 0 ? (
                    <li className="empty-message">할 일이 없습니다 ✨</li>
                ) : (
                    todos.map((todo) => (
                        <li key={todo.id} className="todo-item">
                            <span className="todo-text">{todo.text}</span>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                삭제
                            </button>
                        </li>
                    ))
                )}
            </ul>

            <div className="todo-count">
                총 {todos.length}개의 할 일
            </div>
        </div>
    )
}

export default TodoList
