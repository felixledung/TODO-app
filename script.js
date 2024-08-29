const taskInput = document.querySelector(".task-input input"),
    taskBox = document.querySelector(".task-box"),
    filterAll = document.getElementById("all"),
    filterPending = document.getElementById("pending"),
    filterCompleted = document.getElementById("completed"),
    clearBtn = document.querySelector(".clear-btn");

let todos = JSON.parse(localStorage.getItem("todo-list")) || [];
let currentFilter = 'all';

function showTodo() {
    let li = "";
    let filteredTodos = todos;

    if (currentFilter === 'pending') {
        filteredTodos = todos.filter(todo => todo.status === 'pending');
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.status === 'completed');
    }

    filteredTodos.forEach((todo, id) => {
        li += `<li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${todo.status === 'completed' ? 'checked' : ''}>
                    <p class="${todo.status === 'completed' ? 'checked' : ''}">${todo.name}</p>
                </label>
                <div class="settings">
                    <i class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick="editTask(${id})"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
    });
    taskBox.innerHTML = li;
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

function editTask(id) {
    const newTaskName = prompt("Edit task:", todos[id].name);
    if (newTaskName) {
        todos[id].name = newTaskName;
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
}

function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        todos.splice(id, 1);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
}

filterAll.addEventListener("click", () => {
    currentFilter = 'all';
    filterAll.classList.add("active");
    filterPending.classList.remove("active");
    filterCompleted.classList.remove("active");
    showTodo();
});

filterPending.addEventListener("click", () => {
    currentFilter = 'pending';
    filterAll.classList.remove("active");
    filterPending.classList.add("active");
    filterCompleted.classList.remove("active");
    showTodo();
});

filterCompleted.addEventListener("click", () => {
    currentFilter = 'completed';
    filterAll.classList.remove("active");
    filterPending.classList.remove("active");
    filterCompleted.classList.add("active");
    showTodo();
});

clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
        todos = [];
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key === "Enter" && userTask) {
        taskInput.value = "";
        let taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});

showTodo();