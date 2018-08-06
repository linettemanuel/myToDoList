const form = document.querySelector("#task-form");
const taskList = document.querySelector(".tasks");
const taskInput = document.querySelector("#task");
const submitBtn = document.querySelector(".btn-add");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
let dailyRecord = document.querySelector(".counter_one");
let completeTask = document.querySelector(".counter_two");



const numbers = [];
let i = 0;

while (i < 100){
    numbers.push(i)
    i++;
}

loadEventListeners();

function loadEventListeners() {
    submitBtn.addEventListener("click", addTask);
    next.addEventListener("click", nextTask);
    previous.addEventListener("click", previousTask);
    taskList.addEventListener("click", clearTask);
};

function addTask(e) {
    if(taskInput.value === "") {
        alert("The field is empty. Add a task!");
    } 

    const li = document.createElement("li");
    li.className = "tasks-item";
    const name = document.createElement("h1");
    name.className = "space"
    name.innerHTML = taskInput.value.toUpperCase();
    li.appendChild(name);
    const link = document.createElement("p");
    link.innerHTML = "Done";
    link.className = "btn no-text-deco";
    li.appendChild(link);

    taskList.appendChild(li);

    taskInput.value = "";

    e.preventDefault();
};

function nextTask(e) {

    const allLi = document.querySelectorAll(".tasks li");
    let activeTask = allLi[0];
    activeTask.remove()
    taskList.appendChild(activeTask);

    e.preventDefault();
}
 
function previousTask(e) {
    const allLi = document.querySelectorAll(".tasks li");
    let lastTask = allLi[allLi.length - 1];
    taskList.prepend(lastTask);

    e.preventDefault();
}

function clearTask(e) {
    const clearBtn = document.querySelectorAll(".btn");

    if (e.target.classList.contains("btn")) {
        e.target.parentElement.remove()   
    }
    


    e.preventDefault();

}
