const form = document.querySelector("#task-form");
const taskList = document.querySelector(".tasks");
const taskInput = document.querySelector("#task");
const submitBtn = document.querySelector(".btn-add");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
let dailyRecord = document.querySelector(".counter_one");
let completeTask = document.querySelector(".counter_two");
let counterOne = 0;
let counterTwo = 0;


loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasks);
    submitBtn.addEventListener("click", addTask);
    next.addEventListener("click", nextTask);
    previous.addEventListener("click", previousTask);
    taskList.addEventListener("click", clearTask);
};

function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "tasks-item";
        const name = document.createElement("h1");
        name.className = "space"
        name.innerHTML = String(task).toUpperCase();
        li.appendChild(name);
        const link = document.createElement("p");
        link.innerHTML = "Done";
        link.className = "btn no-text-deco";
        li.appendChild(link);
        taskList.appendChild(li);    
    })

    if (JSON.parse(localStorage.getItem("dailyRecords")) !== null) {
        dailyRecords = JSON.parse(localStorage.getItem("dailyRecords"));
        dailyRecord.innerHTML = dailyRecords;
        counterOne = JSON.parse(localStorage.getItem("dailyRecords"))[0];
    } else {
        dailyRecord.innerHTML = 0;
    }

    if (JSON.parse(localStorage.getItem("completedTask")) !== null) {
        completedTask = JSON.parse(localStorage.getItem("completedTask"));
        completeTask.innerHTML = completedTask;
    } else {
        completeTask.innerHTML = 0 + "%";
    }

    if (JSON.parse(localStorage.getItem("countersTwo")) !== null){
        counterTwo = JSON.parse(localStorage.getItem("countersTwo"))[0];
    } else {
        counterTwo = 0;
    }
}

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

    counterTwo = counterTwo + 1;
    counterChanges();

    storeCounterTwo(counterTwo);
    storeTask(taskInput.value);

    taskInput.value = "";

    e.preventDefault();
}

function storeTask(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
}

function storeDailyRecord(record) {
    let dailyRecords = [];
    dailyRecords.push(record);

    localStorage.setItem("dailyRecords", JSON.stringify(dailyRecords));
}

function storeCompleteTask(record) {
    let completedTask = [];
    completedTask.push(record);

    localStorage.setItem("completedTask", JSON.stringify(completedTask));
}

function storeCounterTwo (record) {
    let countersTwo = [];
    countersTwo.push(record);

    localStorage.setItem("countersTwo", JSON.stringify(countersTwo));
}

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
        if (confirm("Is this task truly done?")) {
            e.target.parentElement.remove();
            counterOne = counterOne + 1;
            dailyRecord.innerHTML = counterOne;

            storeDailyRecord(counterOne);
            counterChanges();
            removeFromStore(e.target.parentElement.children[0]);
        }

    }

    e.preventDefault();

}

function removeFromStore(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task, index) {
        if(taskItem.textContent === task.toUpperCase()) {
            tasks.splice(index, 1);
        }
        
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function counterChanges() {
    if (counterOne != 0) {
        completeTask.innerHTML = Math.round(counterOne/counterTwo * 100) + "%";
        storeCompleteTask(completeTask.innerHTML);
    }
}
