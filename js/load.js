'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  window.load = function (onSuccess, onError) {
    const xhr = window.xhr.createXhr(onSuccess, onError);

    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
