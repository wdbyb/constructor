'use strict';

(function () {
  const api = () => {
    const Method = {
      GET: `GET`,
      PUT: `PUT`,
      POST: `POST`,
      DELETE: `DELETE`
    };
    const SuccessHTTPStatusRange = {
      MIN: 200,
      MAX: 299
    };

    function template({
      url,
      method = Method.GET,
      body = null,
      headers = new Headers()
    }) {

      return fetch(
          `${url}`,
          {method, body, headers}
      )
        .then((response) => {
          if (
            response.status < SuccessHTTPStatusRange.MIN ||
            response.status > SuccessHTTPStatusRange.MAX
          ) {
            throw new Error(`${response.status}: ${response.statusText}`);
          }

          return response;
        })
        .catch((err) => {
          throw err;
        });
    }

    window.api = {
      template
    };
  };

  const image = () => {
    const fileChooser = document.querySelector(`.box__element input[type=file]`);
    const preview = document.querySelector(`.box__image`);

    fileChooser.addEventListener('change', function () {
      const file = fileChooser.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    });
  };

  const validation = () => {
    const cyrillicPattern = /^[\u0400-\u04FF]+$/;
    const title = document.querySelector(`#title`);
    const text = document.querySelector(`#text`);

    function validate(element) {
      if (element.value.length === 0) {
        element.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
      } else if (title.value.length > 20) {
        element.setCustomValidity(`Перестарался, ну.`);
      } else if (!cyrillicPattern.test(element.value)) {
        element.setCustomValidity(`Только кириллица!`);
      } else {
        element.setCustomValidity(``);
      }
    }

    function onTitleChange() {
      validate(title);
    }

    function onTextChange() {
      validate(text);
    }

    text.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
    title.setCustomValidity(`Ну, хоть что-то напишите, ну.`);
    title.addEventListener(`change`, onTitleChange);
    text.addEventListener(`change`, onTextChange);
  };

  const card = () => {
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
  };

  api();
  card();
  image();
  validation();
})();
