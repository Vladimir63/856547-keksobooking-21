'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = function (data, onSuccess, onError) {
    const xhr = window.xhr.createXhr(onSuccess, onError);

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
