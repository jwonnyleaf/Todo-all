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
        status: "Active",
        created: firebase.firestore.FieldValue.serverTimestamp()
    })
    task.value = "";
}

function displayError() {

}

function queryTasks() {
    db.collection("tasks").orderBy("created");
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
        taskItem.setAttribute("id", task.id);
        let taskItemText = document.createElement("div");
        taskItemText.classList.add("task__item--text");
        taskItemText.innerText = task.name;
        let taskItemActions = document.createElement("div");
        taskItemActions.classList.add("task__item--actions");
        // let ActionEdit = document.createElement("button");
        // ActionEdit.classList.add("item--edit");
        // ActionEdit.innerText = "Edit";
        
        // Delete Task Logic
        let ActionDelete = document.createElement("button");
        ActionDelete.classList.add("item--delete");
        ActionDelete.innerText = "Delete";
        ActionDelete.addEventListener("click", (ev) => {
            let taskID = ev.target.parentNode.parentNode.getAttribute("id");
            db.collection("tasks").doc(taskID).delete();
        })

        taskItem.appendChild(taskItemText);
        // taskItemActions.appendChild(ActionEdit);
        taskItemActions.appendChild(ActionDelete);
        taskItem.appendChild(taskItemActions);
        newTaskList.push(taskItem);
    })
    document.getElementById("task-list").replaceChildren(...newTaskList);
}

queryTasks();

