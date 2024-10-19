'use strict';

import { searchTask } from './variable.js';

searchTask.addEventListener('input', function () {
  let val = this.value.trim();
  let searchItems = document.querySelectorAll('.todo__list');

  if (val !== '') {
    searchItems.forEach(function (item) {
      let textElement = item.querySelector('p');
      if (!textElement.innerText.toLowerCase().includes(val.toLowerCase())) {
        item.classList.add('hide');
        textElement.innerHTML = textElement.innerText;
      } else {
        item.classList.remove('hide');
        let str = textElement.innerText;
        textElement.innerHTML = insertMark(str, str.toLowerCase().indexOf(val.toLowerCase()), val.length);
      }
    });
  } else {
    searchItems.forEach(function (item) {
      item.classList.remove('hide');
      let textElement = item.querySelector('p');
      textElement.innerHTML = textElement.innerText;
    });
  }
});

function insertMark(string, pos, len) {
  const before = string.slice(0, pos);
  const mark = string.slice(pos, pos + len);
  const after = string.slice(pos + len);
  return `${before}<mark>${mark}</mark>${after}`;
}
