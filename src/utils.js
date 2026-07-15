export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = (task = {}) => { const { title, dueDate } = task; return title && dueDate ? true : false; };

export const mergeTaskUpdate = (originalTask, ...update) => ({...originalTask, ...update[0]} );