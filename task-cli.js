const { writeFile, readFile } = require("fs");

function getTasks(callback) {
  readFile("data.json", (err, data) => {
    let tasks = [];
    if (!err) {
      try {
        tasks = JSON.parse(data);
        if (!Array.isArray(tasks)) {
          tasks = [];
        }
      } catch (e) {
        tasks = [];
      }
    }

    callback(tasks);
  });
}

function saveTasks(tasks) {
  writeFile("data.json", JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function addTask(description) {
  getTasks((tasks) => {
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      description,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID ${newTask.id})`);
  });
}

function updateTask(id, description) {
  getTasks((tasks) => {
    const taskToUpdate = tasks.find((t) => t.id === id);
    if (taskToUpdate) {
      taskToUpdate.description = description;
      taskToUpdate.updatedAt = new Date().toISOString();
      saveTasks(tasks);
      console.log(`Task (ID ${taskToUpdate.id}) successfully updated`);
    } else {
      console.log("No such task with the given id exists");
    }
  });
}

function deleteTask(id) {
  getTasks((tasks) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    saveTasks(newTasks);
    console.log(`Task (ID ${id}) successfully deleted`);
  });
}

function markTaskInProgress(id) {
  getTasks((tasks) => {
    const taskToMark = tasks.find((t) => t.id === id);
    if (taskToMark) {
      taskToMark.status = "in-progress";
      taskToMark.updatedAt = new Date().toISOString();
      saveTasks(tasks);
      console.log(`Task (ID ${taskToMark.id}) successfully marked in progress`);
    } else {
      console.log("No such task with the given id exists");
    }
  });
}

function markTaskDone(id) {
  getTasks((tasks) => {
    const taskToMark = tasks.find((t) => t.id === id);
    if (taskToMark) {
      taskToMark.status = "done";
      taskToMark.updatedAt = new Date().toISOString();
      saveTasks(tasks);
      console.log(`Task (ID ${taskToMark.id}) successfully marked as done`);
    } else {
      console.log("No such task with the given id exists");
    }
  });
}

function listTasks(status) {
  if (status) {
    getTasks((tasks) => {
      console.log(tasks.filter((t) => t.status === status));
    });
  } else {
    getTasks((tasks) => {
      console.log(tasks);
    });
  }
}

const args = process.argv.slice(2);
switch (args[0]) {
  case "add":
    addTask(args[1]);
    break;
  case "update":
    updateTask(Number(args[1]), args[2]);
    break;
  case "delete":
    deleteTask(Number(args[1]));
    break;
  case "mark-in-progress":
    markTaskInProgress(Number(args[1]));
    break;
  case "mark-done":
    markTaskDone(Number(args[1]));
    break;
  case "list":
    args.length > 1 ? listTasks(args[1]) : listTasks();
    break;
  default:
    console.log("Invalid command");
}
