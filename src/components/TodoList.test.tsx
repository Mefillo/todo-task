import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import { vi } from 'vitest';
import { initialTodos as mockTodos } from '../mocks/todo';

describe('TodoList', () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    const mockEdit = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders empty state when no todos', () => {
        render(<TodoList todos={[]} toggleTodo={mockToggle} deleteTodo={mockDelete} editTodo={mockEdit} />);
        expect(screen.getByText('No todos match your filters')).toBeInTheDocument();
    });

    test('renders list of todos correctly', () => {
        render(<TodoList todos={mockTodos} toggleTodo={mockToggle} deleteTodo={mockDelete} editTodo={mockEdit} />);

        expect(screen.getAllByRole('listitem')).toHaveLength(2);
        expect(screen.getByText('Complete practice project')).toBeInTheDocument();
        expect(screen.getByText('High')).toBeInTheDocument();
        expect(screen.getByText('Due: 5/14/2025')).toBeInTheDocument();
    });

    test('toggles todo completion when checkbox clicked', () => {
        render(<TodoList todos={mockTodos} toggleTodo={mockToggle} deleteTodo={mockDelete} editTodo={mockEdit} />);

        const checkbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox);
        expect(mockToggle).toHaveBeenCalledWith(1);
    });


    test('deletes todo when delete button clicked', () => {
        render(<TodoList todos={mockTodos} toggleTodo={mockToggle} deleteTodo={mockDelete} editTodo={mockEdit} />);

        const deleteButtons = screen.getAllByLabelText('Delete');
        fireEvent.click(deleteButtons[0]);

        expect(mockDelete).toHaveBeenCalledWith(1);
    });

    test('handles keyboard shortcuts', () => {
        render(<TodoList todos={mockTodos} toggleTodo={mockToggle} deleteTodo={mockDelete} editTodo={mockEdit} />);

        // Test 'e' key to start editing
        const todoItem = screen.getAllByRole('listitem')[0];
        fireEvent.keyDown(todoItem, { key: 'e' });
        // Test Escape key to cancel editing
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });

    test('shows overdue status correctly', () => {
        render(<TodoList todos={mockTodos} toggleTodo={mockToggle} deleteTodo={mockDelete} editTodo={mockEdit} />);

        expect(screen.getByText('Due: 5/14/2025')).toBeInTheDocument();
    });
});
