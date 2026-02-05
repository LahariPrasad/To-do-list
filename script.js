let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let currentTimeDisplay = document.getElementById("currentTime");

let taskDataList = JSON.parse(localStorage.getItem("todoData")) || [];
console.log(taskDataList);

// Update the current time every second
setInterval(updateTime, 1000);
renderTasks();

// Event listener for adding tasks
addBtn.addEventListener("click", addTask);

// Update time every second
function updateTime() {
  let currentDate = new Date();
  let hours = currentDate.getHours().toString().padStart(2, '0');
  let minutes = currentDate.getMinutes().toString().padStart(2, '0');
  let seconds = currentDate.getSeconds().toString().padStart(2, '0');
  
  currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Add a new task
function addTask() {
  let taskValue = input.value.trim();

  if (taskValue === "") {
    alert("Please enter a task");
    return;
  }

  // Get the current time displayed next to the heading
  let taskTime = currentTimeDisplay.textContent;

  // Store the task with the current time
  let task = {
    id: Date.now(),
    name: taskValue,
    time: taskTime
  };

  taskDataList.push(task);
  localStorage.setItem("todoData", JSON.stringify(taskDataList));

  input.value = "";  // Clear the input field
  renderTasks();  // Update the task list
}

// Render tasks from localStorage
function renderTasks() {
  taskList.innerHTML = "";  // Clear the list first
  
  taskDataList.forEach((task, index) => {
    // Create a new list item for each task
    let taskElement = document.createElement("li");
    taskElement.innerHTML = `
      ${task.name} - Added at: ${task.time}
      <button class="delete-btn">Remove</button>
    `;

    // Add event listener to the remove button
    taskElement.querySelector(".delete-btn").addEventListener("click", () => {
      removeTask(index);  // Pass the task index to remove it
    });

    // Append the task item to the list
    taskList.appendChild(taskElement);
  });
}

// Remove a task by index
function removeTask(index) {
  taskDataList.splice(index, 1);  // Remove the task from the list
  localStorage.setItem("todoData", JSON.stringify(taskDataList));  // Update localStorage
  renderTasks();  // Re-render the updated task list
}
