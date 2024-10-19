'use strict';

export function getTasksLocalStorage() {
  const tasksJSON = localStorage.getItem('tasks');
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

export function setTasksLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
