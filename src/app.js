 // app.js - Main application entry point
console.log('Server starting...');

//GT3 es6 shi

import { formatDate, validateTask, mergeTaskUpdate } from "./utils.js";

console.log(formatDate(new Date("2026-07-22")));

console.log(validateTask({ title: "sample title", dueDate: "2026-07-22" }) );

console.log(mergeTaskUpdate({ title: "old" },{ title: "new" }) );