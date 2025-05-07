import type { Todo } from "../types/todo";

export const initialTodos: Todo[] = [
    {
        id: 1,
        title: "Learn React Hooks",
        completed: false,
        priority: "High",
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 86400000).toISOString() // 1 day from now
    },
    {
        id: 2,
        title: "Complete practice project",
        completed: true,
        priority: "Medium",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        dueDate: new Date(Date.now() + 604800000).toISOString() // 7 days from now
    }
];