// State
let todos = [];
let mode = $nav.querySelector('.active').id;
// Dom
const $nav = document.querySelector('.nav');
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.querySelector('#ck-complete-all');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $clearCompleted = document.querySelector('.clear-completed > .btn');
// Function
const getTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'JavaScript', completed: false }
  ];
  todos = todos.sort((todo1, todo2) => todo2.id - todo1.id);
  render();
};
const getId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);
const addTodo = content => {
  todos = [{ id: getId(), content, completed: false }, ...todos];
};
const removeTodo = id => {
  todos = todos.filter(todo => todo.id !== +id);
};
const toggleTodo = id => {
  todos = todos.map(todo => (todo.id === +id ? ({ ...todo, completed: !todo.completed }) : todo));
};
const completeAll = completed => {
  todos = todos.map(todo => ({ ...todo, completed }));
};
const toggleCompleteall = checked => {
  $completeAll.checked = checked;
};
const clearCompleted = () => {
  todos = todos.filter(todo => !todo.completed);
};
const activeList = mode => ((mode === 'active') 
  ? todos.filter(todo => !todo.completed) 
  : (mode === 'completed') 
    ? todos.filter(todo => todo.completed) : todos);
const render = () => {
  let html = '';
  //엑티브 클래스를 받은 애한테 아이디가 엑티브면 
  const cpTodos = activeList($nav.querySelector('.active').id);
  cpTodos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
    <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
    <label for="ck-${id}">${content}</label>
    <i class="remove-todo far fa-times-circle"></i>
  </li>`;
  });
  $todos.innerHTML = html;
  $completedTodos.textContent = todos.filter(todo => todo.completed).length;
  $activeTodos.textContent = todos.length - $completedTodos.textContent;
  toggleCompleteall(todos.length ? todos.every(todo => todo.completed) : false);
};
// Event Binding
window.onload = getTodos;
// 클릭된 li 에게 active class를 준다.
$nav.onclick = ({ target }) => {
  // [...$nav.children].forEach(child => child.classList.toggle('active', child === target));
  if (!target.matches('.nav li')) return;
  $nav.querySelector('.active').classList.remove('active');
  target.classList.add('active');
  render();
};
$inputTodo.onkeyup = e => {
  if (e.keyCode !== 13) return;
  $inputTodo.value = $inputTodo.value.trim();
  if (!$inputTodo.value) return;
  addTodo($inputTodo.value);
  render();
  $inputTodo.value = '';
};
$todos.onclick = ({ target }) => {
  if (!target.matches('.remove-todo')) return;
  removeTodo(target.parentNode.id);
  render();
};
$todos.onchange = ({ target }) => {
  toggleTodo(target.parentNode.id);
  render();
};
$completeAll.onclick = ({ target }) => {
  completeAll(target.checked);
  render();
};
$clearCompleted.onclick = () => {
  clearCompleted();
  render();
};