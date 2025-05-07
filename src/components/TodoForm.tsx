import React, { useState } from 'react';
import type { Priority } from '../types/todo';

interface Props {
    addTodo: (todo: { title: string; priority: Priority, dueDate?: string }) => void;
}

const TodoForm: React.FC<Props> = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<Priority>('Medium');
    const [dueDate, setDueDate] = useState<string | undefined>(undefined);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTodo({ title, priority, dueDate });
        setTitle('');
        setPriority('Medium');
        setDueDate(undefined);

    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                className="todo-input"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Add a new task..."
            />
            <input
                className="due-date-input"
                type="date"
                onChange={e => {
                    setDueDate(e.target.value)
                }}
                value={dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''}
                placeholder="Due Date"
            />
            <select className="priority-select" value={priority} onChange={e => setPriority(e.target.value as Priority)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button className="add-button" type="submit">Add Task</button>
        </form>
    );
};

export default TodoForm;
