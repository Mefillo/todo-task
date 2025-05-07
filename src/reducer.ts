import type { State, Action } from './types/todo';


export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.payload.title,
            priority: action.payload.priority,
            completed: false,
              createdAt: new Date().toISOString(),
            ...(action.payload.dueDate && { dueDate: action.payload.dueDate }),
          },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_PRIORITY_FILTER':
      return { ...state, priorityFilter: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'LOAD_TODOS':
          return { ...state, todos: action.payload };
    case 'SET_TODOS':
        return { ...state, todos: action.payload };
    default:
      return state;
  }
}
