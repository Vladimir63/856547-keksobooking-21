'use strict';

// < !--Сообщение об ошибке создания объявления-- >
// <template id="error">
//   <div class="error">
//     <p class="error__message">Ошибка загрузки объявления</p>
//     <button class="error__button">Попробовать снова</button>
//   </div>
// </template>


(function () {
  const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
  const main = document.querySelector(`main`);
  const errorButton = document.querySelector(`#error`).content.querySelector(`.error__button`);
  const templetSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const activatePage = window.activatePage;


  const showError = function (errorMessage) {
    const error = templateError.cloneNode(true);
    error.querySelector(`.error__message`).textContent = errorMessage;
    error.addEventListener(`click`, function () {
      closeError();
    });

    document.addEventListener(`keydown`, onDocumentKeydown);

    main.appendChild(error);
  };

  const errorButtonMouseDownHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
      // Удаляем обработчики
      errorButton.removeEventListener(`mousedown`, errorButtonMouseDownHandler);
      errorButton.removeEventListener(`keydown`, errorButtonKeyDownHandler);
    }
  };

  const errorButtonKeyDownHandler = function (evt) {
    if (evt.key === `Enter`) {
      activatePage();
      // Удаляем обработчики
      errorButton.removeEventListener(`mousedown`, errorButtonMouseDownHandler);
      errorButton.removeEventListener(`keydown`, errorButtonKeyDownHandler);
    }
  };

  const onDocumentKeydown = function (evt) {
    if (evt.key === `Escape`) {
      closeError();
    }
  };

  const closeError = function () {
    const error = main.querySelector(`.error`);
    const success = main.querySelector(`.success`);
    if (error) {
      error.remove();
      document.removeEventListener(`keydown`, onDocumentKeydown);
    } else if (success) {
      success.remove();
      document.removeEventListener(`keydown`, onDocumentKeydown);
    }
  };


  const submittedForm = function () {
    const success = templetSuccess.cloneNode(true);

    success.addEventListener(`click`, function () {
      closeError();
    });

    document.addEventListener(`keydown`, onDocumentKeydown);

    main.appendChild(success);
  };

  const notSubmittedForm = function () {
    const errorForm = templateError.cloneNode(true);

    errorForm.addEventListener(`click`, function () {
      closeError();
    });

    document.addEventListener(`keydown`, onDocumentKeydown);

    main.appendChild(errorForm);
  };

  const similarListmMapPins = document.querySelector(`.map__pins`);

  const renderForm = function () {
    const success = submittedForm();
    const error = notSubmittedForm();

    if (success) {
      similarListmMapPins.appendChild(success);
    } else if (error) {
      similarListmMapPins.appendChild(error);
    }

  };

  let button = document.querySelector(`.ad-form__submit`);

  button.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    renderForm();
  });

  // Вешаем обработчик событий на кнопку ошибки
  errorButton.addEventListener(`keydown`, errorButtonMouseDownHandler);
  errorButton.addEventListener(`mousedown`, errorButtonKeyDownHandler);


  window.message = {
    showError,
    closeError,
    renderForm
  };
})();


