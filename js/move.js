'use strict';

const WIDTH_MAIN_PIN = window.WIDTH_MAIN_PIN;
const HEIGHT_MAIN_PIN = window.HEIGHT_MAIN_PIN;
const HEIGHT_MAIN_PIN_AFTER = window.HEIGHT_MAIN_PIN_AFTER;
const MIN_Y = 130 - HEIGHT_MAIN_PIN_AFTER - HEIGHT_MAIN_PIN;
const MAX_Y = 630 - HEIGHT_MAIN_PIN_AFTER - HEIGHT_MAIN_PIN;
const MIN_X = 0 - Math.ceil(WIDTH_MAIN_PIN / 2);
const MAX_X = 1200 - Math.ceil(WIDTH_MAIN_PIN / 2);
const mapPin = window.mapPin;
const addressForm = window.addressForm;

mapPin.addEventListener(`mousedown`, (evt) => {
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
      x: mapPin.offsetLeft - newCoords.x,
      y: mapPin.offsetTop - newCoords.y
    };

    const BORDER = {
      TOP: MIN_Y,
      BOTTOM: MAX_Y,
      LEFT: MIN_X,
      RIGHT: MAX_X
    };

    if (mapPinPosition.x >= BORDER.LEFT && mapPinPosition.x <= BORDER.RIGHT) {
      mapPin.style.left = `${mapPinPosition.x}px`;
    }

    if (mapPinPosition.y >= BORDER.TOP && mapPinPosition.y <= BORDER.BOTTOM) {
      mapPin.style.top = `${mapPinPosition.y}px`;
    }

    if (mapPinPosition.y + HEIGHT_MAIN_PIN_AFTER > MAX_Y) {
      mapPinPosition.y = MAX_Y;
    }
    if (mapPinPosition.y - HEIGHT_MAIN_PIN_AFTER < MIN_Y) {
      mapPinPosition.y = MIN_Y;
    }
    if (mapPinPosition.x < MIN_X) {
      mapPinPosition.x = MIN_X;
    }
    if (mapPinPosition.x > MAX_X) {
      mapPinPosition.x = MAX_X;
    }

    addressForm.value = `${mapPinPosition.x + Math.ceil(WIDTH_MAIN_PIN / 2)}, ${mapPinPosition.y + HEIGHT_MAIN_PIN + HEIGHT_MAIN_PIN_AFTER}`;
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };
  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

/*
4.3. Формат значения поля адреса: {{x}}, {{y}}, где {{x}} и {{y}} это координаты, на которые метка указывает своим острым концом. Например, если метка .map__pin--main имеет CSS-координаты top: 200px; left: 300px, то в поле адрес должно быть записано значение 300 + расстояние до острого конца по горизонтали, 200 + расстояние до острого конца по вертикали. Координаты не должны быть дробными.


style= top: 200px; left: 300px;
300+65/2
200+65+22
*/
