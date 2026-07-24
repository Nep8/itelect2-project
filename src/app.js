 // app.js - Main application entry point
console.log('Server starting...');

//GT3 es6

import { formatDate, validateTask, mergeTaskUpdate, createTask } from "./utils.js";
import { fetchSampleUsers } from "./api.js";

console.log(formatDate(new Date("2026-07-22")));

console.log(validateTask({ title: "sample title", dueDate: "2026-07-22" }) );

console.log(mergeTaskUpdate({ title: "old" },{ title: "new" }) );

console.log(fetchSampleUsers());

//gt4 asynnc: call fetchsampleusers and createtask w/ sample data wrapped in try/catch

try {
  const users = await fetchSampleUsers();
  console.log(users);

  const newTask = createTask({
    title: "sample task",
    dueDate: "2026-12-25"
  });
  console.log(newTask);
} catch (error) {
  console.error(error.message);
}