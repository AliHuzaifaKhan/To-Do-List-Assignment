// Initialize todos array from localStorage
var todos = JSON.parse(localStorage.getItem('todos')) || [];

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render todos
function renderData() {
  var todoList = document.getElementById('todoList');
  todoList.innerHTML = '';
  todos = JSON.parse(localStorage.getItem('todos')) || [];
    
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
    var li = document.createElement('li');
    li.className = todo.done ? 'todo-item completed' : 'todo-item';
    
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button onclick="markAsDone(${i})" ${todo.done ? 'disabled' : ''}>Done</button>
        <button onclick="editTodo(${i})" ${todo.done ? 'disabled' : ''}>Edit</button>
        <button onclick="deleteTodo(${i})">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  }
}

// Add todo
function addTodo(text) {
  todos.push({ text: text, done: false });
  saveTodos();
  renderData();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderData();
}

// Mark todo as done
function markAsDone(index) {
  todos[index].done = true;
  saveTodos();
  console.log('Todo marked as done:', todos[index]);
  console.log('Completed Task:', localStorage.getItem('todos'));
  renderData();
}

// Edit todo
function editTodo(index) {
  var li = document.getElementsByClassName('todo-item')[index];
  var text = todos[index].text;
  li.innerHTML = `
    <input type="text" value="${text}">
    <button onclick="saveTodoEdit(${index})">Save</button>
  `;
}

// Save todo edit
function saveTodoEdit(index) {
  var input = document.getElementsByClassName('todo-item')[index].getElementsByTagName('input')[0];
  todos[index].text = input.value;
  saveTodos();
  renderData();
}

// Handle form submission
document.getElementById('todoForm').onsubmit = function(e) {
  e.preventDefault();
  var input = document.getElementById('todoInput');
  if (input.value) {
    addTodo(input.value);
    input.value = '';
  }
};

renderData();
