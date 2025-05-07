import React, { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types/todo';

interface Props {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    editTodo: (id: number, newTitle: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');
    const editInputRef = useRef<HTMLInputElement>(null);

    // Keyboard: Escape cancels editing, 'e' starts editing when focused
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (editingId !== null && e.key === 'Escape') {
                setEditingId(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [editingId]);

    useEffect(() => {
        if (editingId !== null) {
            editInputRef.current?.focus();
        }
    }, [editingId]);

    const handleEdit = (todoId: number, todoTitle: string) => {
        setEditingId(todoId);
        setEditText(todoTitle);
    };

    const handleEditKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        }
        if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    const handleSave = () => {
        if (editingId !== null && editText.trim()) {
            editTodo(editingId, editText.trim());
            setEditingId(null);
        }
    };

    const isOverdue = (dueDate?: string) => {
        if (!dueDate) return false;
        const today = new Date();
        const due = new Date(dueDate);
        return due < today && due.toDateString() !== today.toDateString();
    };

    if (todos.length === 0) {
        return <p className="empty-list">No todos match your filters</p>;
    }

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className={`todo-item${todo.completed ? ' completed' : ''}`}
                    tabIndex={0}
                    onKeyDown={e => {
                        if (e.key === 'e' && editingId === null) {
                            e.preventDefault();
                            handleEdit(todo.id, todo.title);
                        }
                    }}
                >
                    {/* Priority indicator on the left */}
                    <span className={`priority-indicator ${todo.priority}`}>
                        {todo.priority}
                    </span>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="todo-checkbox"
                    />
                    {editingId === todo.id ? (
                        <div className="edit-form">
                            <input
                                ref={editInputRef}
                                type="text"
                                value={editText}
                                onChange={e => setEditText(e.target.value)}
                                onKeyDown={handleEditKeyDown}
                                className="edit-input"
                                aria-label="Edit todo"
                            />
                            <button onClick={handleSave} className="save-button">Save</button>
                            <button onClick={() => setEditingId(null)} className="cancel-button">Cancel</button>
                        </div>
                    ) : (
                        <>
                            <span className="todo-title">{todo.title}</span>
                            <button
                                onClick={() => handleEdit(todo.id, todo.title)}
                                className="edit-button"
                                aria-label="Edit"
                            >
                                Edit
                            </button>
                        </>
                    )}
                    <span
                        className="todo-due-date"
                        data-overdue={isOverdue(todo.dueDate)}
                        title={todo.dueDate ? `Due: ${todo.dueDate}` : 'No due date'}
                    >
                        {todo.dueDate
                            ? isOverdue(todo.dueDate)
                                ? `Overdue: ${new Date(todo.dueDate).toLocaleDateString()}`
                                : `Due: ${new Date(todo.dueDate).toLocaleDateString()}`
                            : ''}
                    </span>
                    <button
                        className="delete-button"
                        onClick={() => deleteTodo(todo.id)}
                        aria-label="Delete"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
