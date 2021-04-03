'use strict';

(function () {
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
})();
