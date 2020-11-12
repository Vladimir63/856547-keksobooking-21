'use strict';
const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

window.load = function (onSuccess, onError) {
  const xhr = window.xhr.createXhr(onSuccess, onError);
  xhr.open(`GET`, URL_LOAD);
  xhr.send();
};
