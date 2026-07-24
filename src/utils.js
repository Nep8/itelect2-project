export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = (task = {}) => { const { title, dueDate } = task; return title && dueDate ? true : false; };

export const mergeTaskUpdate = (originalTask, ...update) => ({...originalTask, ...update[0]} );

export class TaskValidationError extends Error { constructor(message) { super(message); this.name = "TaskValidationError"; } }

export function createTask(taskData) {
  if (!validateTask(taskData)) throw new TaskValidationError("Invalid task data");
  return { 
    id: Date.now(), completed: false, ...taskData }; 
    };