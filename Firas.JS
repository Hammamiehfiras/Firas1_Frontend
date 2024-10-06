// DOM elements
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const searchInput = document.getElementById('search-todo');

// Load todos from Local Storage or start empty
let todos = JSON.parse(localStorage.getItem('todos')) || [];

const renderTodos = (filter = '') => {
    todoList.innerHTML = todos
        .filter(todo => todo.text.toLowerCase().includes(filter.toLowerCase()))
        .map((todo, i) => `
            <li>
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${i})">
                <label class="${todo.completed ? 'completed' : ''}">${todo.text}</label>
            </li>
        `)
        .join('');
};

// Add todo
const addTodo = () => {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        updateTodos();
    }
};

// Toggle complete status and update
function toggleComplete(i) {
    todos[i].completed = !todos[i].completed;
    updateTodos();
}

// Update local storage and re-render
const updateTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(searchInput.value);
};

// Event listeners
addTodoButton.onclick = addTodo;
searchInput.oninput = () => renderTodos(searchInput.value);

// Initial render
renderTodos();
