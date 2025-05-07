import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import TodoForm from './TodoForm';

describe('TodoForm', () => {
    test('renders input field and buttons', () => {
        const mockAddTodo = vi.fn();
        render(<TodoForm addTodo={mockAddTodo} />);

        expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
    });

    test('calls addTodo with new todo when form is submitted', () => {
        const mockAddTodo = vi.fn();
        render(<TodoForm addTodo={mockAddTodo} />);

        // Fill out the form
        const input = screen.getByPlaceholderText('Add a new task...') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Test new todo' } });

        const prioritySelect = screen.getByRole('combobox');
        fireEvent.change(prioritySelect, { target: { value: 'High' } });

        // Submit the form
        const button = screen.getByRole('button', { name: /add task/i });
        fireEvent.click(button);

        // Check if addTodo was called with the right arguments
        expect(mockAddTodo).toHaveBeenCalledWith({
            title: 'Test new todo',
            priority: 'High'
        });

        // Input should be cleared after submission
        expect((input as HTMLInputElement).value).toBe('');
    });

    test('does not call addTodo when title is empty', () => {
        const mockAddTodo = vi.fn();
        render(<TodoForm addTodo={mockAddTodo} />);

        // Submit form without entering a title
        const button = screen.getByRole('button', { name: /add task/i });
        fireEvent.click(button);

        // addTodo should not be called
        expect(mockAddTodo).not.toHaveBeenCalled();
    });
});
