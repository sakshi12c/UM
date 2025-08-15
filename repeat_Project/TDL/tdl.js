const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} />
      <span contenteditable="true">${task.text}</span>
      <div class="task-actions">
        <button data-index="${index}" class="delete-btn">Delete</button>
      </div>
    `;

    li.querySelector("input").addEventListener("change", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    li.querySelector("span").addEventListener("blur", (e) => {
      task.text = e.target.textContent.trim();
      saveTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") {
    alert("Task cannot be empty!");
    return;
  }

  tasks.push({ text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
});

renderTasks();