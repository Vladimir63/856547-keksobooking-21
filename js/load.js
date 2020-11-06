'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest(); // созадем запрос

    xhr.responseType = `json`; // возвращает ответ в формате json

    xhr.addEventListener(`load`, function () { // Событие load происходит когда ресурс и его зависимые ресурсы закончили загружаться.
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;

        case 401:
          error = `Пользователь не авторизован`;
          break;

        case 404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS; // 10s

    xhr.open(`GET`, URL); // Метод XMLHttpRequest.open() инициализирует новый запрос или повторно инициализирует уже созданный.
    xhr.send(); // Метод XMLHttpRequest.send() отправляет запрос
  };
})();
