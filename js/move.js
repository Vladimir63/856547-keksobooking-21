'use strict';


const MIN_COORDINATE_Y = 130;
const MAX_COORDINATE_Y = 630;
const MIN_COORDINATE_X = 0;
const MAX_COORDINATE_X = 1200;
const MIN_Y = MIN_COORDINATE_Y - window.map.HEIGHT_MAIN_PIN_AFTER - window.map.HEIGHT_MAIN_PIN;
const MAX_Y = MAX_COORDINATE_Y - window.map.HEIGHT_MAIN_PIN_AFTER - window.map.HEIGHT_MAIN_PIN;
const MIN_X = MIN_COORDINATE_X - Math.ceil(window.map.WIDTH_MAIN_PIN / 2);
const MAX_X = MAX_COORDINATE_X - Math.ceil(window.map.WIDTH_MAIN_PIN / 2);
const addressForm = window.addressForm;

window.pin.mapPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let newCoords = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    let mapPinPosition = {
      x: window.pin.mapPin.offsetLeft - newCoords.x,
      y: window.pin.mapPin.offsetTop - newCoords.y
    };

    const BORDER = {
      TOP: MIN_Y,
      BOTTOM: MAX_Y,
      LEFT: MIN_X,
      RIGHT: MAX_X
    };

    if (mapPinPosition.x >= BORDER.LEFT && mapPinPosition.x <= BORDER.RIGHT) {
      window.pin.mapPin.style.left = `${mapPinPosition.x}px`;
    }

    if (mapPinPosition.y >= BORDER.TOP && mapPinPosition.y <= BORDER.BOTTOM) {
      window.pin.mapPin.style.top = `${mapPinPosition.y}px`;
    }

    if (mapPinPosition.y + window.map.HEIGHT_MAIN_PIN_AFTER > MAX_Y) {
      mapPinPosition.y = MAX_Y;
    }
    if (mapPinPosition.y - window.map.HEIGHT_MAIN_PIN_AFTER < MIN_Y) {
      mapPinPosition.y = MIN_Y;
    }
    if (mapPinPosition.x < MIN_X) {
      mapPinPosition.x = MIN_X;
    }
    if (mapPinPosition.x > MAX_X) {
      mapPinPosition.x = MAX_X;
    }

    addressForm.value = `${mapPinPosition.x + Math.ceil(window.map.WIDTH_MAIN_PIN / 2)}, ${mapPinPosition.y + window.map.HEIGHT_MAIN_PIN + window.map.HEIGHT_MAIN_PIN_AFTER}`;
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };
  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
