export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = (task = {}) => { const { title, dueDate } = task; return title && dueDate ? true : false; };

export const mergeTaskUpdate = (originalTask, ...updates) =>
  updates.reduce((merged, update) => ({ ...merged, ...update }), originalTask);

export class TaskValidationError extends Error { constructor(message) { super(message); this.name = "TaskValidationError"; } }

export function createTask(taskData) {
  if (!validateTask(taskData)) throw new TaskValidationError("Invalid task data");
  return { 
    id: Date.now(), completed: false, ...taskData }; 
    };

export const tasks = [
  { id: 1, title: "sample task 1", dueDate: "2026-07-22", completed: false },
  { id: 2, title: "sample task 2", dueDate: "2026-07-23", completed: true },
  { id: 3, title: "sample task 3", dueDate: "2026-07-24", completed: false },
];