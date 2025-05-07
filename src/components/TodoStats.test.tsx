import { render, screen } from '@testing-library/react';
import TodoStats from './TodoStats';
import { vi } from 'vitest';
import type { Todo } from '../types/todo';

const mockTodos:Todo[] = [
    {
        id: 1,
        title: 'Learn React Hooks',
        completed: false,
        priority: 'High',
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 86400000).toISOString(),
    },
    {
        id: 2,
        title: 'Complete practice project',
        completed: true,
        priority: 'Medium',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        dueDate: new Date(Date.now() + 604800000).toISOString(),
    },
    {
        id: 3,
        title: 'test practice project',
        completed: true,
        priority: 'Medium',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        dueDate: new Date(Date.now() + 604800000).toISOString(),
    },
];

describe('TodoStats', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders total, active, and completed counts correctly', () => {
        render(<TodoStats todos={mockTodos} />);

        expect(screen.getByText(/Total/i)).toBeInTheDocument();
        expect(screen.getByText(/Active/i)).toBeInTheDocument();
        expect(screen.getByText(/Completed/i)).toBeInTheDocument();

        expect(screen.getByText(mockTodos.length)).toBeInTheDocument();
        expect(screen.getByText(mockTodos.filter(t => !t.completed).length)).toBeInTheDocument();
        expect(screen.getByText(mockTodos.filter(t => t.completed).length)).toBeInTheDocument();
    })
});
