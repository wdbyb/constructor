'use strict';

(function () {
  const RENDER_MORE = 10;
  const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.card`);
  const showMoreTemplateElement = document.querySelector(`#showMore`).content.querySelector(`.showMore`);
  const loaderTemplateElement = document.querySelector(`#loader`).content.querySelector(`.loader`);
  const loaderELement = loaderTemplateElement.cloneNode(true);
  const bodyElement = document.querySelector(`body`);
  const formElement = document.querySelector(`.box`);
  const spotElement = document.querySelector(`.spot`);
  let counter = 0;

  bodyElement.appendChild(loaderELement);
  hideLoader();

  function renderCard() {
    const cardElement = cardTemplateElement.cloneNode(true);
    spotElement.appendChild(cardElement);
  }

  function hideLoader() {
    loaderELement.classList.add(`visually-hidden`);
  }

  function showLoader() {
    loaderELement.classList.remove(`visually-hidden`);
  }

  function renderShowMoreButton() {
    const showMoreElement = showMoreTemplateElement.cloneNode(true);
    spotElement.appendChild(showMoreElement);

    showMoreElement.addEventListener(`click`, () => {
      showLoader();
      showMoreElement.remove();

      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(() => {
          for (let i = 0; i < RENDER_MORE; i++) {
            renderCard();
          }
          spotElement.appendChild(showMoreElement);
        })
        .then(() => hideLoader());
    });
  }

  formElement.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    if (counter < RENDER_MORE) {
      showLoader();
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(() => renderCard())
        .then(() => hideLoader());
      counter++;
    } else if (counter >= RENDER_MORE && !document.querySelector(`.showMore`)) {
      renderShowMoreButton();
    }
  });
})();
