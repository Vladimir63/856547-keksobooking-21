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


  const showError = function (errorMessage) {
    const error = templateError.cloneNode(true);
    error.querySelector(`.error__message`).textContent = errorMessage;
    error.addEventListener(`click`, function () {
      closeError();
    });

    document.addEventListener(`keydown`, onDocumentKeydown);

    main.appendChild(error);
  };

  const onDocumentKeydown = function (evt) {
    if (evt.key === `Escape`) {
      closeError();
    }
  };

  const closeError = function () {
    const error = main.querySelector(`.error`);
    if (error) {
      error.remove();
      document.removeEventListener(`keydown`, onDocumentKeydown);
    }
  };

  window.message = {
    showError,
    closeError
  };
})();
