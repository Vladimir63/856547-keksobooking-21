'use strict';

const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
const templetSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
const main = document.querySelector(`main`);
let errorButton;

const showError = function (errorMessage) {
  const error = templateError.cloneNode(true);
  errorButton = error.querySelector(`.error__button`);
  error.querySelector(`.error__message`).textContent = errorMessage;
  error.addEventListener(`click`, function () {
    closeError();
  });

  document.addEventListener(`keydown`, onDocumentKeydown);

  errorButton.addEventListener(`mousedown`, errorButtonMouseDownHandler);
  errorButton.addEventListener(`keydown`, errorButtonKeyDownHandler);

  main.appendChild(error);
};

const showSuccess = function () {
  const success = templetSuccess.cloneNode(true);
  success.addEventListener(`click`, function () {
    closeSuccess();
  });

  document.addEventListener(`keydown`, onDocumentKeydown);

  main.appendChild(success);
};

const errorButtonMouseDownHandler = function (evt) {
  if (evt.button === 0) {
    window.map.activatePage();
    errorButton.removeEventListener(`mousedown`, errorButtonMouseDownHandler);
    errorButton.removeEventListener(`keydown`, errorButtonKeyDownHandler);
  }
};

const errorButtonKeyDownHandler = function (evt) {
  if (evt.key === `Enter`) {
    window.map.activatePage();
    errorButton.removeEventListener(`mousedown`, errorButtonMouseDownHandler);
    errorButton.removeEventListener(`keydown`, errorButtonKeyDownHandler);
  }
};

const closeError = function () {
  const error = main.querySelector(`.error`);
  if (error) {
    error.remove();
    document.removeEventListener(`keydown`, onDocumentKeydown);
  }
};

const closeSuccess = function () {
  const success = main.querySelector(`.success`);
  if (success) {
    success.remove();
    document.removeEventListener(`keydown`, onDocumentKeydown);
  }
};

const onDocumentKeydown = function (evt) {
  if (evt.key === `Escape`) {
    closeError();
    closeSuccess();
  }
};

window.message = {
  showError,
  showSuccess
};

