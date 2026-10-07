const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value.trim();
  if (text === "") {
    errorEl.hidden = false;
    return;
  }
  errorEl.hidden = true;
  tasks.push({ 
    id: nextId++, 
    text: text, 
    done: false 
  });
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  let status = task.done;
  task.done = !status;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function clearCompleted() {
  tasks = tasks.filter((t) => t.done !== true);
  render();
}

function isTaskInCategory(task) {
  if (currentFilter === "all") {
    return true;
  }

  if (currentFilter === "active") {
    return task.done === false;
  }

  if (currentFilter === "done") {
    return task.done === true;
  }

  return false;
}

function getVisibleTasks() {
  let tasksFiltered = tasks.filter((task) => isTaskInCategory(task));
  return tasksFiltered;
}

function activeTasks(task) {
  if (task.done === false) {
    return true;
  }
  return false;
}

function updateCounter() {
  let active = tasks.filter ((t) => activeTasks(t));
  counter.textContent = "Активных задач: " + active.length;
}

function render() {
  const visible = getVisibleTasks();
  list.innerHTML = ``;
  for (let i = 0; i <= visible.length - 1; i++) {
    const task = visible[i];
    const li = document.createElement("li");
    li.className = "task";
    if (task.done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
