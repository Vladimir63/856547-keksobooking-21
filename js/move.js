'use strict';
(function () {

  const WIDTH_MAIN_PIN = window.WIDTH_MAIN_PIN;
  const HEIGHT_MAIN_PIN = window.HEIGHT_MAIN_PIN;
  const HEIGHT_MAIN_PIN_AFTER = window.HEIGHT_MAIN_PIN_AFTER;
  const HEIGHT_MAIN_PIN_TOTAL = HEIGHT_MAIN_PIN_AFTER + HEIGHT_MAIN_PIN;


  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_X = 0;
  const MAX_X = 1160;
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
        TOP: MIN_Y - mapPin.offsetHeight - HEIGHT_MAIN_PIN_TOTAL,
        BOTTOM: MAX_Y - mapPin.offsetHeight + HEIGHT_MAIN_PIN_TOTAL,
        LEFT: MIN_X,
        RIGHT: MAX_X - mapPin.offsetWidth + WIDTH_MAIN_PIN
      };

      // логика ограничения: пользователь может поставить метку в позицию 0,0 / 0,1200 / 630,0 / 630,1200
      // отсчет ведется на ножке метки.
      // теперь style из button совпадает с данными из addressForm
      // или я считаю не с того места?
      // изначально у главной метки были координаты 602, 459 в поле адрес, но в браузере в инспекторе кода было вот так <button class="map__pin map__pin--main" style="left: 570px; top: 375px;">
      // получается, гдето отсчет не верный. или значения из поля адрес не должны совпадать с стилем кнопки??
      // до активации: 602, 406 в поле адреса    и     <button class="map__pin map__pin--main" style="left: 570px; top: 375px;">
      // после 602, 459 против <button class="map__pin map__pin--main" style="left: 570px; top: 375px;">
      // когда метка двигается начинает совпадать

      // ограничение перемещения по Х
      if (mapPinPosition.x >= BORDER.LEFT && mapPinPosition.x <= BORDER.RIGHT) {
        mapPin.style.left = `${mapPinPosition.x}px`;
      }
      // ограничение перемещения по Y
      if (mapPinPosition.y >= BORDER.TOP && mapPinPosition.y <= BORDER.BOTTOM) {
        mapPin.style.top = `${mapPinPosition.y}px`;
      }

      // addressForm.setAttribute(`value`, mapPinPosition.x + `, ` + mapPinPosition.y);
      addressForm.value = `${mapPinPosition.x} ${mapPinPosition.y}`;
      // window.fillAddress();
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

