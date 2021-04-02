'use strict';

(function () {
  const RENDER_MORE = 10;
  const bodyElement = document.querySelector(`body`);
  const formElement = document.querySelector(`.box`);
  const spotElement = document.querySelector(`.spot`);
  const title = document.querySelector(`#title`);
  const text = document.querySelector(`#text`);
  const link = document.querySelector(`#link`);
  let clickCount = 0;
  let renderCount = RENDER_MORE;
  let store = [];

  function createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
  }

  function createCard(cardTitle, cardText, linkUrl = `#`, imageUrl = `https://profitserfing.ru/avatar/6228.jpeg?1593690309`) {
    return `<a class="card" href=${linkUrl}>
        <img class="card__image" src=${imageUrl} width="200px" height="200px" alt="Джуниор">
        <p>${cardTitle}</p>
        <p>${cardText}</p>
    </a>`;
  }

  function createLoader() {
    return `<div class="loader"></div>`;
  }

  function createButton() {
    return `<button class="button" type="button" name="button">Загрузить больше</button>`;
  }

  function hideLoader() {
    loaderELement.classList.add(`visually-hidden`);
  }

  function showLoader() {
    loaderELement.classList.remove(`visually-hidden`);
  }

  bodyElement.appendChild(createElement(createLoader()));

  const loaderELement = document.querySelector(`.loader`);

  hideLoader();

  window.api.template({
    url: `https://jsonplaceholder.typicode.com/todos/1`,
  });

  function renderButton() {
    const button = createElement(createButton());
    spotElement.appendChild(button);

    button.addEventListener(`click`, () => {
      showLoader();
      button.remove();
      renderCount += RENDER_MORE;
      spotElement.innerText = ``;

      window.api.template({
        url: `https://jsonplaceholder.typicode.com/todos/1`,
      })
        .then(() => {
          for (let i = 0; i < clickCount; i++) {
            const cardEl = createElement(createCard(store[i].title, store[i].text, store[i].link));
            spotElement.appendChild(cardEl);
          }
        })
        .then(() => hideLoader());
    });
  }

  formElement.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    clickCount++;

    store.push({
      title: title.value,
      text: text.value,
      link: link.value ? link.value : null,
    });

    const cardEl = createElement(createCard(title.value, text.value, link.value));

    if (clickCount < renderCount) {
      showLoader();

      window.api.template({
        url: `https://jsonplaceholder.typicode.com/todos/1`,
      })
        .then(() => spotElement.appendChild(cardEl))
        .then(() => hideLoader());
    }

    if (clickCount >= renderCount && !document.querySelector(`.button`)) {
      renderButton();
    }

    title.value = ``;
    text.value = ``;
    link.value = ``;

    text.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
    title.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
  });
})();
