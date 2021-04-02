'use strict';

(function () {
  const cyrillicPattern = /^[\u0400-\u04FF]+$/;
  const title = document.querySelector(`#title`);
  const text = document.querySelector(`#text`);

  function onTitleChange() {
    if (title.value.length === 0) {
      title.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
    } else if (title.value.length > 20) {
      title.setCustomValidity(`Перестарался, ну.`);
    } else if (!cyrillicPattern.test(title.value)) {
      title.setCustomValidity(`Только кириллица!`);
    } else {
      title.setCustomValidity(``);
    }
  }

  function onTextChange() {
    if (text.value.length === 0) {
      text.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
    } else if (text.value.length > 250) {
      text.setCustomValidity(`Перестарался, ну.`);
    } else if (!cyrillicPattern.test(text.value)) {
      text.setCustomValidity(`Только кириллица!`);
    } else {
      text.setCustomValidity(``);
    }
  }

  text.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
  title.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
  title.addEventListener(`change`, onTitleChange);
  text.addEventListener(`change`, onTextChange);
})();
