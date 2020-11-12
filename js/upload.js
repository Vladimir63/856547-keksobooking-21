'use strict';
const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;

window.upload = function (data, onSuccess, onError) {
  const xhr = window.xhr.createXhr(onSuccess, onError);
  if (data) {
    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  }
};

