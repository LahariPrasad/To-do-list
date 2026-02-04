let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let taskDataList = JSON.parse(localStorage.getItem("taskData")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);

function addTask() {
  if (input.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  taskDataList.push(input.value.trim());
  localStorage.setItem("taskData", JSON.stringify(taskDataList));

  input.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  taskDataList.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerText = task;

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });

    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      taskDataList.splice(index, 1);
      localStorage.setItem("taskData", JSON.stringify(taskDataList));
      renderTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}
