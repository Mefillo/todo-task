import { useReducer, useEffect } from 'react';
import './index.scss';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import type { Priority, State, Todo } from './types/todo';
import { reducer } from './reducer';
// import { initialTodos } from './mocks/todo';

const initialState: State = {
  todos: [],
  filter: 'all',
  priorityFilter: 'all',
  sortBy: 'createdAt',
};

const priorityOrder: Record<Priority, number> = { Low: 1, Medium: 2, High: 3 };

function App() {
  const getInitialTodos = () => {
    const saved = localStorage.getItem('todos');
    const todos: Todo[] = saved ? JSON.parse(saved) : [];
    if (todos.length > 0) {
      return todos;
    }
    return [];
  };
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    todos: getInitialTodos(),
  }
  );
  const { todos, filter, priorityFilter, sortBy } = state;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const setTodos = (updatedTodos: Todo[]) => {
    dispatch({ type: 'SET_TODOS', payload: updatedTodos });
  };

  const getFilteredTodos = () => {
    return todos
      .filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter(todo => {
        if (priorityFilter !== 'all') return todo.priority === priorityFilter;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="controls">
        <select value={filter} onChange={e => dispatch({ type: 'SET_FILTER', payload: e.target.value as State['filter'] })}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select value={priorityFilter} onChange={e => dispatch({ type: 'SET_PRIORITY_FILTER', payload: e.target.value as State['priorityFilter'] })}>
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select value={sortBy} onChange={e => dispatch({ type: 'SET_SORT_BY', payload: e.target.value as State['sortBy'] })}>
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>
      <TodoStats todos={todos} />
      <TodoForm addTodo={todo => dispatch({ type: 'ADD_TODO', payload: todo })} />
      <TodoList
        todos={getFilteredTodos()}
        toggleTodo={id => dispatch({ type: 'TOGGLE_TODO', payload: id })}
        deleteTodo={id => dispatch({ type: 'DELETE_TODO', payload: id })}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;

