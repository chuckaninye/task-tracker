const { randomUUID } = require("crypto");
const { writeFile, readFile } = require("fs");

function addTask(task) {
  const newTask = {
    id: randomUUID(),
    description: task,
    status: "todo",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  readFile("data.json", (err, data) => {
    if (err) {
      const arr = [newTask];
      writeFile("data.json", JSON.stringify(arr, null, 2), (err, data) => {});
    }

    try {
      json = JSON.parse(data);
    } catch (e) {
      json = [];
    }
    if (!Array.isArray(json)) json = [json];

    json.push(newTask);
    writeFile("data.json", JSON.stringify(json, null, 2), (err, data) => {});
  });
}

function updateTask() {
  console.log("update");
}

function deleteTask() {
  console.log("delete");
}

function markTaskInProgress() {
  console.log("in progress");
}

function markTaskDone() {
  console.log("done");
}

function listTasks(status) {
  if (status) {
    res = [];
    readFile("data.json", (err, data) => {
      try {
        tasks = JSON.parse(data);
        for (t of tasks) {
          if (t.status === status) {
            res.push(t);
          }
        }
      } catch (e) {}

      console.log(res);
    });
  } else {
    readFile("data.json", (err, data) => {
      try {
        json = JSON.parse(data);
        console.log(json);
      } catch (e) {
        json = [];
        console.log(json);
      }
    });
  }
}

const args = process.argv.slice(2);

const commands = {
  add: (arg) => addTask(arg),
  update: () => updateTask(),
  delete: () => deleteTask,
  "mark-in-progress": () => markTaskInProgress(),
  "mark-done": () => markTaskDone(),
  list: (arg) => listTasks(arg),
};

if (args[0] in commands) {
  commands[args[0]](args[1]);
} else {
  console.log("invalid command");
}
