'use strict';

import { saveNote } from './btnEvent.js';
import { doneSvg, pinnedSvg, delSvg, editSvg } from './svg.js';
import { setupDragula } from './script.js';

export function renderTask() {
  taskTemplate.innerHTML = '';
  if (!saveNote || !saveNote.length) return;

  saveNote
    .sort((a, b) => {
      if (a.isDone !== b.isDone) {
        return a.isDone ? 1 : -1;
      }
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }
      return a.position - b.position;
    })
    .forEach((task, taskIndex) => {
      const { id, text, isDone, isPinned } = task;
      const item = `
    <li class="todo__list ${isDone ? 'done' : ''} ${isPinned ? 'pinned' : ''}" data-task-id="${id}">
      <span class="task__index ${isDone ? 'none' : ''}" >${taskIndex + 1}.</span>
      <p class="task__text">${text}</p>
        <div class="task__btns">
          <button class="task__done ${isDone ? 'active' : ''}">
            ${doneSvg}
          </button>
          <button class="task__pinned ${isPinned ? 'active' : ''}">
            ${pinnedSvg}
          </button>
          <button class="task__edit">
            ${editSvg}
          </button>
          <button class="task__delete">
            ${delSvg}
          </button>
        </div>
      </li>
    `;
      document.querySelector('#taskTemplate').insertAdjacentHTML('beforeend', item);
    });

  setupDragula();
}
