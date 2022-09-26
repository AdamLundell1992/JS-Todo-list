const todoContent = document.getElementById('todoText');
const todoTitle = document.getElementById('todo-title');
let arrayOfTodos = [];
let count = 0;
const todoChecked = ((checked) => {
  const idToRemove = arrayOfTodos.find((todo) => todo.id == checked);
  const indexToCheck = arrayOfTodos.findIndex((todo) => todo.id === idToRemove.id)
  const arrayIndexIsClicked = arrayOfTodos[indexToCheck].clicked;
  let className = `.induvidual-class-${String(idToRemove.id)}`
  let currentFoundClass = document.querySelector(className);
  if(arrayIndexIsClicked){
    arrayOfTodos[indexToCheck].clicked = false;
    currentFoundClass.style.background = 'whitesmoke';
  } else{
    currentFoundClass.style.background = '#c8e2c8';
    arrayOfTodos[indexToCheck].clicked = true;
  }
});

const removeId = ((removeId) => {
  const indexToRemove = arrayOfTodos.findIndex((todo) => todo.id === removeId)
  arrayOfTodos.splice(indexToRemove,1);
  document.getElementById('list-items').innerHTML = ''
});
const initiateRemoveStyle = ((removeId) =>{
  const styleNumToFind = String(removeId)
  document.querySelector(`.induvidual-class-${styleNumToFind}`).style.background = 'red'
  document.querySelector(`.induvidual-class-${styleNumToFind}`).style.width = '12rem'
  document.querySelector(`.induvidual-button-class-${styleNumToFind}`).style.display = 'none'
});
const remove = (value) => {
  const idToRemove = arrayOfTodos.find((todo) => todo.id == value).id;
  initiateRemoveStyle(idToRemove);
  const selectedDiv = document.getElementById(value);
  selectedDiv.classList.add('remove-animate')
  setTimeout(() =>{
  if(arrayOfTodos.length <= 1) {
    arrayOfTodos = [];
    document.getElementById('list-items').innerHTML = ''
    } else {
      removeId(idToRemove)
    for(const todos of arrayOfTodos) {
      let checkedValue = todos.clicked;
      document.getElementById('list-items').innerHTML += `<span class="box all-content-indexes induvidual-class-${String(todos.id)}" id="${String(todos.id)}">
      <div class="title-text-button">
      <input checked="true" class="check-box todoChecked-${String(todos.id)}" type="checkbox" id="myCheck${String(todos.id)}" onclick="todoChecked(${String(todos.id)})">
      <div class="title-text">
      <div class="todo-index-title">
      <p class="ttitle">${todos.title}</p>
      </div>
      <span class="todo-content-text">${todos.content}</span>
      </div>
      <button class="remove induvidual-button-class-${String(todos.id)}" id="remove${String(todos.id)}" type="button" onclick="remove(${String(todos.id)})">Remove</button>
      </div>
      </span>`;
      let checkedIdValue = `myCheck${todos.id}`;
      let checkedHtml = document.getElementById(checkedIdValue);
      let className = `.induvidual-class-${String(todos.id)}`
      let currentFoundClass = document.querySelector(className);
      if(!checkedValue){
        checkedHtml.removeAttribute('checked')
      } else {
        currentFoundClass.style.background = '#c8e2c8';
      }
  }
}
selectedDiv.classList.remove('remove-animate')
},900); 
}
const submitData = (() => {
  const todoObject = {id: count, title:todoTitle.value, content: todoContent.value, clicked: false}
  if(todoObject.title && todoObject.content){
    arrayOfTodos.push(todoObject);
    count ++;
    document.getElementById('list-items').innerHTML = ''
    for(const todos of arrayOfTodos) {
      let checkedValue = todos.clicked;
      document.getElementById('list-items').innerHTML += `<span class="box all-content-indexes induvidual-class-${String(todos.id)}" id="${String(todos.id)}">
      <div class="title-text-button">
      <input checked="true" class="check-box todoChecked-${String(todos.id)}" type="checkbox" id="myCheck${String(todos.id)}" onclick="todoChecked(${String(todos.id)})">
      <div class="title-text">
      <div class="todo-index-title">
      <p class="ttitle">${todos.title}</p>
      </div>
      <span class="todo-content-text">${todos.content}</span>
      </div>
      <button class="remove induvidual-button-class-${String(todos.id)}" type="button" onclick="remove(${String(todos.id)})">Remove</button>
      </div>
      </span>`;
      let checkedIdValue = `myCheck${todos.id}`;
      let checkedHtml = document.getElementById(checkedIdValue);
      if(!checkedValue){
        checkedHtml.removeAttribute('checked')
      }
    }
    todoTitle.value = '';
    todoContent.value = '';

  } else {
    document.getElementById('error-message').innerHTML = 'All fields must have data!'
    setTimeout(() => {
      document.getElementById('error-message').innerHTML = ''
    }, 3000);
  }
});
