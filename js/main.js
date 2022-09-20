let containerTodos = document.querySelector('.todo__app');
let submitForm = document.querySelector('.form');
let btnAdd = document.querySelector('.btnAdd');
let inputTodo = document.querySelector('.inputTodo');
let resultTodo = document.querySelector('.resultTodo');
let btnEdit  = document.querySelector('.buttonEditEls');
let selectedEls = null;
let targetId;


window.addEventListener('DOMContentLoaded',() => {
   let data =   local.getLocalStorage(); 
   data.forEach((itemTodos) => {
    create.createElement(itemTodos)
   })
  })

submitForm.addEventListener('submit',(e) => {
  e.preventDefault();
  if(inputTodo.value === ""){
    window.alert('Isi form mu dengan benar');
  }else{
     let getId = () => {
      return Math.floor(Math.random() * 1000);
     }
    let obj = {
      id : getId(),
      todo : inputTodo.value
    }
   if(selectedEls === null){
    create.createElement(obj);
    local.saveLocalStorage(obj);
    selectedEls = null;
   }else{
    create.editTodosEls(obj);
    selectedEls = null;
   }
  }
});

class create{
  static createElement(data){
    let todoList = document.createElement('div');
    todoList.classList = "TodoList";
    todoList.id = data.id;
    let divTodo = document.createElement('div');
    divTodo.classList = "todo";
    divTodo.appendChild(document.createTextNode(data.todo));
    let btnContainer = document.createElement('div');
    btnContainer.classList = "btnContainer";
    let buttonEdit = document.createElement('button');
    buttonEdit.classList = "buttonEdit";
    buttonEdit.innerHTML = `<i class="fa-sharp fa-solid fa-pen"></i>`;
    let buttonDelete = document.createElement('button');
    buttonDelete.classList = "buttonDelete";
    buttonDelete.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`;
    btnContainer.appendChild(buttonEdit);
    btnContainer.appendChild(buttonDelete);
    todoList.appendChild(divTodo)
    todoList.appendChild(btnContainer)
    resultTodo.appendChild(todoList)

    inputTodo.value = "";
  }
  static editTodos(data){
    if(data.classList.contains('buttonEdit')){
      targetId = parseInt(data.parentElement.parentElement.id);
      selectedEls = data.parentElement.parentElement;
      inputTodo.value = selectedEls.children[0].textContent;
      btnAdd.innerHTML = `<i class="fa-sharp fa-solid fa-pen"></i>`
    }else null
  }
  static editTodosEls(data){ 
    let getObj = local.getLocalStorage();
    let updateObj = getObj.map((itemNew) => {
      if(itemNew.id === targetId){
        itemNew.todo = inputTodo.value;
      }
      return itemNew
    });
    localStorage.setItem('todos',JSON.stringify(updateObj))
    selectedEls.children[0].innerHTML = inputTodo.value;
    inputTodo.value = "";
    btnAdd.innerHTML = `<i class="fa-solid fa-square-plus"></i>`
  }
  static deleteTodos(data){
    if(data.classList.contains('buttonDelete')){
      let target = data.parentElement.parentElement;
      target.remove();
      local.deleteLocalStorage(target);
    }
  }
}
resultTodo.addEventListener('click',(e) => {
  create.editTodos(e.target)
  create.deleteTodos(e.target);
});

class local{
  static saveLocalStorage(data){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(data);
    localStorage.setItem('todos',JSON.stringify(todos));
  }
  static getLocalStorage(){
    let todos;
    if(localStorage.getItem('todos') === null){
      todos = []
    }else{
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos
  }
  static deleteLocalStorage(data){
    let todos;
    if(localStorage.getItem('todos') === null){
      todos = []
    }else{
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    let targetDelete = data.children[0].textContent;
    todos.splice(todos.indexOf(targetDelete),1);
    localStorage.setItem('todos',JSON.stringify(todos));
  }
}
