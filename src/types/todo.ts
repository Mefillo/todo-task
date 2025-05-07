export type Priority = 'Low' | 'Medium' | 'High';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    priority: Priority;
    createdAt: string;
    dueDate?: string;
}
export interface State {
    todos: Todo[];
    filter: 'all' | 'active' | 'completed';
    priorityFilter: 'all' | Priority;
    sortBy: 'createdAt' | 'priority';
}


export type Action =
    | { type: 'ADD_TODO'; payload: Omit<Todo, 'id' | 'completed' | 'createdAt'> & { priority: Priority } }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'SET_FILTER'; payload: State['filter'] }
    | { type: 'SET_PRIORITY_FILTER'; payload: State['priorityFilter'] }
    | { type: 'SET_SORT_BY'; payload: State['sortBy'] }
    | { type: 'LOAD_TODOS'; payload: Todo[] }
    | { type: 'SET_TODOS'; payload: Todo[] };

