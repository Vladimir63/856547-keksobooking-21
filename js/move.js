'use strict';
(function () {

  const WIDTH_MAIN_PIN = window.WIDTH_MAIN_PIN;
  // const HEIGHT_MAIN_PIN = window.HEIGHT_MAIN_PIN;
  const HEIGHT_MAIN_PIN_AFTER = window.HEIGHT_MAIN_PIN_AFTER;
  // const HEIGHT_MAIN_PIN_TOTAL = HEIGHT_MAIN_PIN_AFTER + HEIGHT_MAIN_PIN;


  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_X = 0;
  const MAX_X = 1200;
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
        TOP: MIN_Y - HEIGHT_MAIN_PIN_AFTER,
        BOTTOM: MAX_Y - HEIGHT_MAIN_PIN_AFTER,
        LEFT: MIN_X - WIDTH_MAIN_PIN / 2,
        RIGHT: MAX_X - WIDTH_MAIN_PIN / 2
      };
      /*
      4.1.Приблизительный адрес квартиры указывается перемещением специальной метки по карте Токио.Содержимое поля адреса должно соответствовать координатам метки:
      1.в неактивном состоянии страницы метка круглая, поэтому в поле адреса подставляются координаты центра метки;
      2.при переходе страницы в активное состояние в поле адреса подставляются координаты острого конца метки;
      3.при перемещении(mousemove) метки в поле адреса подставляются координаты острого конца метки.

      1. работает как надо, считает центр (601, 344)
      2. метка 62х62. значит 62/2 до края метки + высота ножки = 31 + 22 = 53. прибавляем к высоте 53 = 397. такая координата при активации страницы.
      3. 601 397 - д.б. начало.
      */
      // ограничение перемещения по Х
      if (mapPinPosition.x >= BORDER.LEFT && mapPinPosition.x <= BORDER.RIGHT) {
        mapPin.style.left = `${mapPinPosition.x}px`;
      }
      // ограничение перемещения по Y
      if (mapPinPosition.y >= BORDER.TOP && mapPinPosition.y <= BORDER.BOTTOM) {
        mapPin.style.top = `${mapPinPosition.y}px`;
      }

      // addressForm.setAttribute(`value`, mapPinPosition.x + `, ` + mapPinPosition.y);
      addressForm.value = `${mapPinPosition.x + WIDTH_MAIN_PIN / 2} ${mapPinPosition.y + HEIGHT_MAIN_PIN_AFTER}`;
      //  если логнуть, то будет смещение на 22
      // console.log(mapPin.style.top);
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

