'use strict';

(function () {
  const RENDER_MORE = 10;
  const bodyElement = document.querySelector(`body`);
  const formElement = document.querySelector(`.box`);
  const spotElement = document.querySelector(`.spot`);
  const title = document.querySelector(`#title`);
  const text = document.querySelector(`#text`);
  const link = document.querySelector(`#link`);
  const img = document.querySelector(`.box__image`);
  let clickCount = 0;
  let renderCount = RENDER_MORE;
  let store = [];

  function createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
  }

  function createCard(cardTitle, cardText, linkUrl = `#`, imageUrl = `https://www.taemana.com/wp-content/uploads/2017/09/team-placeholder.png`) {
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
          store.forEach((card) => {
            const cardElement = createElement(createCard(card.title, card.text, card.link, card.img));
            spotElement.appendChild(cardElement);
          });

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
      img: img.src ? img.src : null,
    });

    const cardEl = createElement(createCard(title.value, text.value, link.value, img.src));

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
    img.src = `https://www.taemana.com/wp-content/uploads/2017/09/team-placeholder.png`;

    text.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
    title.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
  });
})();
