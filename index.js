let input = document.querySelector(".input");
let addBtn = document.querySelector(".button");
let todosContainer = document.querySelector(".todos-container");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let todo = input.value;
  let key = Date.now();
  todo = todo.trim();
  if (todo.length > 0) {
    todos.push({ id: key, todo, isComplete: false });
  }
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos);
  input.value = "";
});

function mainLogin(e) {
  let key = e.target.dataset.key;
  let todoDelKey = e.target.dataset.todokey;  // imp point dataset key should not be in camelcase
  console.log(key)
//   if (key !== undefined)
    todos = todos.map((todo) =>
      todo.id == key ? { ...todo, isComplete: !todo.isComplete } : todo
    );
//   if (todoDelKey !== undefined)
    todos = todos.filter((todo) => todo.id != todoDelKey);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todoDelKey);
  console.log(todos);
  renderTodos(todos);
}

todosContainer.addEventListener("click", mainLogin);

function renderTodos(todos) {
  todosContainer.innerHTML = todos.map(
    ({ id, todo, isComplete }) =>
      `<div class='todo relative'><input data-key=${id} id=${id} type='checkbox' ${
        isComplete ? "checked" : ""
      }  class="t-checkbox t-pointer"> <label data-key=${id} for=${id}  class="todo-text t-pointer ${
        isComplete ? "checked-todo" : ""
      }">${todo}</label> <button class="absolute right-0 button cursor">
      <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
            </button><div>`
  ).join(' ');
}

renderTodos(todos);
