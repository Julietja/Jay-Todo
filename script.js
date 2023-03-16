// get elements
const addBtn = document.getElementById("add-butn");
const textBox = document.getElementById("text-box");
const displayArea = document.getElementById("display-area");

// initialize an empty array for todos
let todos = [];

// retrieve todos from local storage
if(localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
}

// display todos on page load
displayTodos();

// function for adding an item to todos
AddNewTodo = () => {
const todoText = textBox.value; // gets text from textbox
todos.push({ text: todoText, isEditing: false });(todoText); // adds todo to array
localStorage.setItem("todos", JSON.stringify(todos)); // saves todos to local storage
displayTodos(); // display todos
textBox.value = ""; // clear textbox
}

// function for deleting and editing an item on todos
deleteAndEdit = (e) => {
  // check if delete button is clicked
  if(e.target.classList.contains("delete")) {
    // get index of todo to delete
    const index = e.target.parentElement.getAttribute("data-index");

    // remove todo from array
    todos.splice(index, 1);

    // save todos to local storage
    localStorage.setItem("todos", JSON.stringify(todos));

    // display todos
    displayTodos();
  }
  
  // check if edit button is clicked
  if(e.target.classList.contains("edit")) {
    // get index of todo to edit
    const index = e.target.parentElement.getAttribute("data-index");

    // set todo to editing mode
    todos[index].isEditing = true;

    // display todos
    displayTodos();
  }
}

// function for textbox when editing an item on todos
textboxWhenEditingTodo = (e) => {
  // check if enter key is pressed
  if(e.key === "Enter") {
    // get index of todo being edited
    const index = e.target.parentElement.getAttribute("data-index");

    // set todo to not editing mode
    todos[index].isEditing = false;

    // update todo text
    todos[index].text = e.target.value;

    // save todos to local storage
    localStorage.setItem("todos", JSON.stringify(todos));

    // display todos
    displayTodos();
  }
}

// event listener for add button
addBtn.addEventListener("click", AddNewTodo);

// event listener for delete and edit buttons
displayArea.addEventListener("click", deleteAndEdit);

// event listener for textbox when editing todo
displayArea.addEventListener("keyup", textboxWhenEditingTodo)


// function to display todos
function displayTodos() {
  displayArea.innerHTML = ""; // clear display area

  // loop through todos and display them
  for(let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    // create todo item
    const todoItem = document.createElement("div");
    todoItem.classList.add("lists-holder");
    todoItem.setAttribute("data-index", i);

    // create checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `list-item-${i}`);
    checkbox.checked = todo.isEditing ? false : true;
    checkbox.disabled = todo.isEditing;

    // create label
    const label = document.createElement("label");
    label.setAttribute("for", `list-item-${i}`);
    label.classList.add("text");
    label.textContent = todo.text;
    label.contentEditable = todo.isEditing;

    // create edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.textContent = todo.isEditing ? "Save" : "Edit";

    // create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Delete";

    // append elements to todo item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(editBtn);
    todoItem.appendChild(deleteBtn);

    // append todo item to display area
    displayArea.appendChild(todoItem);
  }
}