'use strict';

import { form, btnCancel, textAreaInput, btnSubmit } from './variable.js';
import { renderTask } from './render.js';
import { getTasksLocalStorage, setTasksLocalStorage } from './localStorage.js';

export let editId = null;
export let isEditTask = false;
export let saveNote = getTasksLocalStorage();

// ! Функція виконання задачі
export function doneTask(e) {
  const taskElement = e.target.closest('.todo__list');
  if (!taskElement) {
    console.error('Task element not found');
    return;
  }
  const taskId = taskElement.dataset.taskId;
  let task = saveNote.find(task => task.id === taskId);
  if (!task) {
    console.error('Task with ID', taskId, 'not found in saveNote');
    return;
  }
  // Змінюємо статус задачі (виконана чи ні)
  task.isDone = !task.isDone;
  // Якщо задача виконана, відміняємо закріплення
  if (task.isDone) {
    task.isPinned = false; // Знімаємо відмітку про закріплення
  }
  // Сортуємо задачі: спочатку невиконані, потім виконані
  saveNote.sort((a, b) => {
    if (a.isDone && !b.isDone) return 1; // Виконання вниз
    if (!a.isDone && b.isDone) return -1; // Невиконання вверх
    return a.position - b.position;
  });
  // Перераховуємо позиції для усіх задач
  saveNote.forEach((task, index) => {
    task.position = index;
  });
  // Зберігаємо зміни в локальному сховищі
  setTasksLocalStorage(saveNote);
  renderTask(); // Оновлюємо відображення задач
}

// ! Функція закріплення задачі
export function pinnedTask(e) {
  const task = e.target.closest('.todo__list');
  const id = task.dataset.taskId;

  // saveNote = getTasksLocalStorage();
  const index = saveNote.findIndex(task => task.id === id);

  if (index === -1) {
    return alert('Такая задача не найдена!');
  }

  // Перевіряємо, можливо чи ні закріпити задачу
  if (!saveNote[index].isPinned && saveNote[index].isDone) {
    return alert('Чтобы закрепить задачу, сначала уберите отметку о выполнении!');
  }

  // Перемикаємо подію закріплення задачі
  saveNote[index].isPinned = !saveNote[index].isPinned;

  setTasksLocalStorage(saveNote);
  renderTask();
}

// ! Функція редагування задачі
export function editTask(e) {
  const task = e.target.closest('.todo__list');
  const text = task.querySelector('.task__text');
  editId = task.dataset.taskId; // Зберігаємо ID редагуємої задачі

  textAreaInput.value = text.textContent; // Завантажуємо текст задачі у текстове поле
  textAreaInput.focus();
  isEditTask = true; // Встановлюємо прапор редагування
  btnSubmit.textContent = 'Зберегти'; // Змінюємо текст кнопки на "Зберегти"
  btnCancel.classList.remove('none'); // Показуємо кнопку відміни
  form.scrollIntoView({ behavior: 'smooth' }); // Прокручуємо до форми
}

// ! Функція видалення задачі
export function delTask(e) {
  const taskElement = e.target.closest('.todo__list');
  const id = taskElement.dataset.taskId;
  saveNote = saveNote.filter(task => task.id !== id); // Видаляємо задачу за ID
  setTasksLocalStorage(saveNote); // Зберігаємо зміни в локальному сховищі
  renderTask(); // Оновлюємо відображення задач
}

// ! Функція для скидання стану форми
export function resetForm() {
  textAreaInput.value = ''; // Очищуємо текстове поле
  isEditTask = false; // Скидаємо прапор редагування
  editId = null; // Скидаємо ID редагуємої задачі
  btnSubmit.textContent = 'Додати'; // Повертаємо текст кнопки до "Додати"
  btnCancel.classList.add('none'); // Приховуємо кнопку Відмінити
}

// Обробник подій для кнопки "Відмінити"
btnCancel.addEventListener('click', e => {
  e.preventDefault();
  resetForm(); // Скидаємо форму
  textAreaInput.value = ''; // Повертаємо оригінальний текст у текстовому полі
});
