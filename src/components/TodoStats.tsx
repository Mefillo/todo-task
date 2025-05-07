import React from 'react';
import type { Todo, Priority } from '../types/todo';

interface Props {
    todos: Todo[];
}

const priorityOrder: Record<Priority, number> = { Low: 1, Medium: 2, High: 3 };

const TodoStats: React.FC<Props> = ({ todos }) => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    const highestPriority = todos
        .filter(t => !t.completed)
        .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])[0];

    return (
        <div className="todo-stats">
            <h2>Todo Statistics</h2>
            <div className="stats-grid">
                <div className="stat-box">
                    <p className="stat-label">Total</p>
                    <p className="stat-value">{total}</p>
                </div>
                <div className="stat-box">
                    <p className="stat-label">Active</p>
                    <p className="stat-value">{active}</p>
                </div>
                <div className="stat-box">
                    <p className="stat-label">Completed</p>
                    <p className="stat-value">{completed}</p>
                </div>
            </div>
            {highestPriority && (
                <div className="priority-alert">
                    <h3>Highest Priority Task:</h3>
                    <p>
                        {highestPriority.title} ({highestPriority.priority})
                    </p>
                </div>
            )}
        </div>
    );
};

export default TodoStats;
