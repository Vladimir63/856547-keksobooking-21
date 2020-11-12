'use strict';

window.load = function (onSuccess, onError) {
  const xhr = window.xhr.createXhr(onSuccess, onError);
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  xhr.open(`GET`, URL);
  xhr.send();
};

