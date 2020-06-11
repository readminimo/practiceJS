let todos = [];
const $inputTodo = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $completeAll = document.getElementById('ck-complete-all');
const $clearButton = document.querySelector('.btn');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const render = () => {
  let html = '';
  todos.forEach(todo => html += `<li id="${todo.id}" class="todo-item">
    <input id="ck-${todo.id}" class="checkbox" type="checkbox" ${todo.completed ? 'checked' : ''}>
    <label for="ck-${todo.id}">${todo.content}</label>
    <i class="remove-todo far fa-times-circle"></i>
  </li>`);
  //포이치문 돌면서 html을 완성한다. 
  $todos.innerHTML = html;
  $completedTodos.textContent = todos.filter(todo => todo.completed).length;
  $activeTodos.textContent = todos.length - $completedTodos.textContent;
}
const getId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);
const addTodo = content => {
  todos = [{id: getId(), content, completed: false}, ...todos];
  render();
};
const removeTodo = id => {
  todos = todos.filter(todo => todo.id !== +id);
  render();
};
const toggleTodo = id => {
  todos = todos.map(todo => todo.id === +id ? ({ ...todo, completed: !todo.completed}) : todo);
  render();
};
const toggleAlltodo = completed => {
  todos = todos.map(todo => ({ ...todo, completed }));
  render();
};
const clearCompletedtodo = () => {
  todos = todos.filter(todo => !todo.completed);
  render();
};
window.onload = () => {
  todos = [
    {id: 1, content: 'HTML', completed: false },
    {id: 2, content: 'CSS', completed: true },
    {id: 3, content: 'Javascript', completed: false }
  ];
  todos = todos.sort((todo1, todo2) => todo2.id - todo1.id);
  render();
};
$inputTodo.onkeyup = e => {
  if(e.keyCode !== 13) return;
  e.target.value = e.target.value.trim();
  if(!e.target.value) return;
  addTodo(e.target.value);
  e.target.value = '';
};
$todos.onclick = e => {
  if(!e.target.matches('.remove-todo')) return;
  removeTodo(e.target.parentNode.id);
};
$todos.onchange = e => {
  toggleTodo(e.target.parentNode.id);
};
$completeAll.onchange = e => {
  toggleAlltodo(e.target.checked);
};
$clearButton.onclick = clearCompletedtodo;