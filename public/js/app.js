
const $nav = document.querySelector('.nav');
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.querySelector('#ck-complete-all');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $clearCompleted = document.querySelector('.clear-completed > .btn');


const render = () => {
  let html = '';
todos.forEach(({id, content, completed}) => {
  
  html += `<li id="${id}" class="todo-item">
  <input id="ck-${id}" class="checkbox" type="checkbox" ${completed? 'checked' : ''}>
  <label for="ck-${id}">${content}</label>
  <i class="remove-todo far fa-times-circle"></i>
</li> `
  
})
$todos.innerHTML = html;
};

let todos = [];




const ajax = (function() {
  const request = (method, url, callback, payload) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('content-type','application/json');
    xhr.send(JSON.stringify(payload));
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        // Success!
        callback(JSON.parse(xhr.response));
      } else {
        // Fails!
        console.error(xhr.status);
      }
    };
  }
  return {
    get(url, callback) {
      request('GET', url, callback)
    },
    post(url, payload, callback) {
      request('POST', url, callback, payload)
    },
    patch(url, payload, callback){
      request('PATCH', url, callback, payload)
    },
    remove(url, callback){
      request('DELETE', url, callback)
    }
  }
})();
// const get = (url, callback) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url);
//   xhr.send();
//   xhr.onload = () => {
//     if (xhr.status === 200 || xhr.status === 201) {
//       // Success!
//       callback(JSON.parse(xhr.response));
//     } else {
//       // Fails!
//       console.error(xhr.status);
//     }
//   };
// };

// get('/todos', serverResponse => {
//   todos = serverResponse;
//   const newTodo = { id: 4, content: "React", completed: false };
//   post('/todos', newTodo, todo => {
//     todos = [todo, ...todos];
    
//     const completed = !todos.find(todo => todo.id === 4).completed;
//     patch('/todos/4', { completed }, editedTodo => {
//       todos = todos.map(todo => todo.id === 4 ? editedTodo : todo);
//       remove('/todos/4', _ => {
//         todos = todos.filter(todo => todo.id !== 4);
//         render();
//       });
//     });
//   });
// });

//EventHandler
window.onload = () => {
  ajax.get('/todos', _todos => {
   todos = _todos;
  
   console.log('hi');
   render();// render error메세지 뜨는 곳 다음에 적으면 안되나?
  })
};


let newTodo = {};
const getId = () => {
  //todos의 id 중 제일 큰 값을 구해서 상태를 저장해놓고, 숫자가 있으면 +1 없으면 1.
  //Math.max전달된 인수 중 가장 큰 값을 뱉음. 
  Math.max(0,...todos.map(todo => todo.id)) +1;
}

let content = '';
$inputTodo.onkeyup = e => {
  if(e.keyCode !== 13) return
  content = e.target.value;
  newTodo = {id : getId() ,content ,completed:false};
  ajax.post('/todos', newTodo, _newTodo => {
    todos = [...todos, _newTodo];
    e.target.value = '';
    render();
  })
}
$todos.onchange = e => {
 const completed = e.target.checked;
 const parentId = e.target.parentNode.id;
 ajax.patch(`/todos/${parentId}`, {completed}, _todo => {
   // todos의 맵 돌면서 todos의 아이디와 받은 todo의
   //id를 매치하여 맞으면  새로운투두 맵 , 아니면 원래 투두를 맵.
   todos = todos.map(todo => todo.id === _todo.id ? _todo : todo);
   console.log(todos);
   render();
 })
 
}



