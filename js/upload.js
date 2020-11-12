'use strict';

window.upload = function (data, onSuccess, onError) {
  const xhr = window.xhr.createXhr(onSuccess, onError);
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  xhr.open(`POST`, URL);
  xhr.send(data);
};

