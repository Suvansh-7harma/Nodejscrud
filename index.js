const fs = require("fs");
const path = require("path");
const readline = require("readline");

const taskFilePath = path.join(__dirname, "tasks.txt");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function addTask(task) {
  fs.appendFile(taskFilePath, task + "\n", (err) => {
    if (err) throw err;
    console.log("Task added successfully.");
    rl.close();
  });
}

function viewTasks() {
  fs.readFile(taskFilePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading tasks:", err);
      rl.close();
      return;
    }
    console.log("Tasks:");
    console.log(data);
    rl.close();
  });
}

function markTaskComplete(index) {
  fs.readFile(taskFilePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading tasks:", err);
      rl.close();
      return;
    }
    const tasks = data.split("\n");
    if (index < 0 || index >= tasks.length) {
      console.log("Invalid task index.");
      rl.close();
      return;
    }
    tasks[index] = "[X] " + tasks[index];
    fs.writeFile(taskFilePath, tasks.join("\n"), (err) => {
      if (err) throw err;
      console.log("Task marked as complete.");
      rl.close();
    });
  });
}

function removeTask(index) {
  fs.readFile(taskFilePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading tasks:", err);
      rl.close();
      return;
    }
    const tasks = data.split("\n");
    if (index < 0 || index >= tasks.length) {
      console.log("Invalid task index.");
      rl.close();
      return;
    }
    tasks.splice(index, 1);
    fs.writeFile(taskFilePath, tasks.join("\n"), (err) => {
      if (err) throw err;
      console.log("Task removed.");
      rl.close();
    });
  });
}

function promptOperation() {
  rl.question(
    "Enter operation (add, view, complete, remove): ",
    (operation) => {
      switch (operation) {
        case "add":
          rl.question("Enter new task: ", addTask);
          break;
        case "view":
          viewTasks();
          break;
        case "complete":
          rl.question(
            "Enter index of task to mark as complete: ",
            markTaskComplete
          );
          break;
        case "remove":
          rl.question("Enter index of task to remove: ", removeTask);
          break;
        default:
          console.log("Invalid operation.");
          rl.close();
      }
    }
  );
}

promptOperation();
