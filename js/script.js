'use strict';

import { setTasksLocalStorage } from './localStorage.js';
import { renderTask } from './render.js';
import { saveNote } from './btnEvent.js';

renderTask();

// Функції для Drag and Drop
export function setupDragula() {
  const drake = dragula([document.getElementById('taskTemplate')]);
  drake.on('drop', () => {
    updateTaskOrder();
    savePositionTask();
  });
}

function updateTaskOrder() {
  const tasks = [...document.querySelectorAll('.todo__list')];
  tasks.forEach((item, i) => {
    const indexElement = item.querySelector('.task__index');
    if (indexElement) {
      indexElement.textContent = `${i + 1}.`;
    }
  });
}

function savePositionTask() {
  const tasks = [...document.querySelectorAll('.todo__list')];
  tasks.forEach((item, i) => {
    const id = item.dataset.taskId;
    const index = saveNote.findIndex(value => value.id === id);
    if (index !== -1) {
      saveNote[index].position = i;
    }
  });
  setTasksLocalStorage(saveNote);
}
