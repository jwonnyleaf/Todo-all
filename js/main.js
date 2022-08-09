function addTask(event) {
    event.preventDefault();
    let task = document.getElementById("task__user-input");

    // Input Validation
    if(!task.value) {
        displayError();
        return;
    }

    db.collection("tasks").add({
        name: task.value,
        status: "Active"
    })
    task.value = "";
}

function displayError() {

}

function queryTasks() {
    db.collection("tasks").onSnapshot((querySnapshot) => {
        var tasks = [];
        querySnapshot.forEach((doc) => {
            tasks.push({id: doc.id, ...doc.data()});
        });
        // Update List
        updateTasks(tasks);
    });
}

function updateTasks(tasks) {
    let newTaskList = [];
    tasks.forEach((task) => {
        let taskItem = document.createElement("div");
        taskItem.classList.add("task__item");
        let taskItemText = document.createElement("div");
        taskItemText.classList.add("task__item--text");
        taskItemText.innerText = task.name;
        let taskItemActions = document.createElement("div");

        taskItem.appendChild(taskItemText);
        taskItem.appendChild(taskItemActions);
        newTaskList.push(taskItem);
    })
    document.getElementById("task-list").replaceChildren(...newTaskList);
}

queryTasks();

