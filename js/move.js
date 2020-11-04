'use strict';
(function () {

  const WIDTH_MAIN_PIN = window.WIDTH_MAIN_PIN;
  const HEIGHT_MAIN_PIN_AFTER = window.HEIGHT_MAIN_PIN_AFTER;

  const MIN_Y = 130 - HEIGHT_MAIN_PIN_AFTER;
  const MAX_Y = 630 - HEIGHT_MAIN_PIN_AFTER;
  const MIN_X = 0 - WIDTH_MAIN_PIN / 2;
  const MAX_X = 1200 - WIDTH_MAIN_PIN / 2;
  const mapPin = window.mapPin;
  const addressForm = window.addressForm;

  // вешаю обработчик на гл. метку
  mapPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    // координаты метки
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // ф-ция движения метки
    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      // уже новые координаты метки
      let newCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      // координаты метки для след цикла
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // тут мы считаем координаты уже `движение` этой метки
      let mapPinPosition = {
        x: mapPin.offsetLeft - newCoords.x,
        y: mapPin.offsetTop - newCoords.y
      };
      // ограничитель зоны передвижения
      const BORDER = {
        TOP: MIN_Y,
        BOTTOM: MAX_Y,
        LEFT: MIN_X,
        RIGHT: MAX_X
      };

      // ограничение перемещения по Х
      if (mapPinPosition.x >= BORDER.LEFT && mapPinPosition.x <= BORDER.RIGHT) {
        mapPin.style.left = `${mapPinPosition.x}px`;
      }
      // ограничение перемещения по Y
      if (mapPinPosition.y >= BORDER.TOP && mapPinPosition.y <= BORDER.BOTTOM) {
        mapPin.style.top = `${mapPinPosition.y}px`;
      }

      if (mapPinPosition.y + HEIGHT_MAIN_PIN_AFTER > MAX_Y) {
        mapPinPosition.y = MAX_Y;
      }
      if (mapPinPosition.y - HEIGHT_MAIN_PIN_AFTER < MIN_Y) {
        mapPinPosition.y = MIN_Y;
      }
      if (mapPinPosition.x - WIDTH_MAIN_PIN / 2 < MIN_X) {
        mapPinPosition.x = MIN_X;
      }
      if (mapPinPosition.x + WIDTH_MAIN_PIN / 2 > MAX_X) {
        mapPinPosition.x = MAX_X;
      }

      addressForm.value = `${mapPinPosition.x + WIDTH_MAIN_PIN / 2}, ${mapPinPosition.y + HEIGHT_MAIN_PIN_AFTER}`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
