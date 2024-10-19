'use strict';

import { doneTask, pinnedTask, editTask, delTask, resetForm } from './btnEvent.js';
import { textAreaInput, btnSubmit, taskTemplate } from './variable.js';
import { isEditTask, editId } from './btnEvent.js';
import { setTasksLocalStorage } from './localStorage.js';
import { saveNote } from './btnEvent.js';
import { renderTask } from './render.js';

function generateUniqueId() {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 10000);
  const randomPartTwo = Math.floor(Math.random() * 10000);
  return timestamp + randomPart + randomPartTwo;
}

btnSubmit.addEventListener('click', e => {
  e.preventDefault();
  const areaInput = textAreaInput.value.trim();

  if (isEditTask && editId) {
    // Якщо ми редагуємо задачу
    const taskIndex = saveNote.findIndex(task => task.id === editId);
    if (taskIndex !== -1 && areaInput) {
      // Перевіряємо, що задача знайдена та текст не порожній
      saveNote[taskIndex].text = areaInput; // Оновлюємо текст задачі
      setTasksLocalStorage(saveNote); // Зберігаємо зміни в локальному сховищі
      renderTask(); // Оновлюємо відображення задач
      resetForm(); // Скидаємо форму
    } else if (!areaInput) {
      console.error('Текст задачи не может быть пустым'); // Логуємо помилку, якщо текст порожній
    }
  } else if (areaInput) {
    // Якщо це нова задача
    saveNote.push({
      id: String(generateUniqueId()),
      text: areaInput,
      isDone: false,
      isPinned: false,
      position: 100,
    });
    setTasksLocalStorage(saveNote);
    renderTask();
    textAreaInput.value = '';
  }
});

taskTemplate.addEventListener('click', e => {
  const taskElement = e.target.closest('.todo__list');
  if (!taskElement) return;

  // const taskIndex = Array.from(taskTemplate.children).indexOf(taskElement); // Отримуємо індекс задачі
  // const taskId = taskElement.querySelector('.task__index').dataset.taskId; // Отримуємо ID задачі

  if (e.target.closest('.task__pinned')) {
    pinnedTask(e);
  } else if (e.target.closest('.task__edit')) {
    editTask(e);
  } else if (e.target.closest('.task__delete')) {
    delTask(e); // Передаємо індекс для видалення
  } else if (e.target.closest('.task__done')) {
    doneTask(e);
  }
});
