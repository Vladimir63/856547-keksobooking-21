'use strict';

const titleForm = document.querySelector(`#title`);
const priceForm = document.querySelector(`#price`);
const addressForm = document.querySelector(`#address`);
const typeOfHouseForm = document.querySelector(`#type`);
const timeInForm = document.querySelector(`#timein`);
const timeOutForm = document.querySelector(`#timeout`);
const adForm = document.querySelector(`.ad-form`);
const adFormRoomNumber = adForm.querySelector(`#room_number`);
const adFormGuestNumber = adForm.querySelector(`#capacity`);
const adFormReset = document.querySelector(`.ad-form__reset`);
const TYPE_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

// Блокируем изменение атрибутов формы
for (let i = 0; i < adForm.children.length; i++) {
  adForm.children[i].setAttribute(`disabled`, `disabled`);
}

// Блокируем изменение атрибутов блока фильтров
for (let i = 0; i < window.map.mapFilters.children.length; i++) {
  window.map.mapFilters.children[i].setAttribute(`disabled`, `disabled`);
}

adForm.querySelector(`#address`).setAttribute(`value`, window.map.LEFT_MAP_PIN + `, ` + window.map.TOP_MAP_PIN);


const createAttributesForm = function () {

  // 0. Найти форму в DOM, установить ей атрибут action = "https://javascript.pages.academy/keksobooking"

  adForm.setAttribute(`action`, `https://javascript.pages.academy/keksobooking`);
  // 1. Найти заголовок объявления в разметке, установить для него атрибуты: обязательное текстовое, минимальное длина 30 сим, максимальная 100 символов.

  titleForm.setAttribute(`required`, `required`);
  titleForm.setAttribute(`minlength`, `30`);
  titleForm.setAttribute(`maxlength`, `100`);
  // 2. Цена за ночь. Обязательное числовое поле. Максимальное значение 1 000 000.

  priceForm.setAttribute(`required`, `required`);
  priceForm.setAttribute(`max`, `1000000`);

  // 3. Адрес, обязательное поле, недоступно для редактирования
  addressForm.setAttribute(`readonly`, `readonly`);
};

createAttributesForm();

// При активации чтоб было верное значение: квартира = 1000
priceForm.setAttribute(`min`, TYPE_PRICE[typeOfHouseForm.value]);
priceForm.setAttribute(`placeholder`, TYPE_PRICE[typeOfHouseForm.value]);

// Вешаем обработчик на изменение типа жилья
typeOfHouseForm.addEventListener(`change`, function () {
  priceForm.setAttribute(`min`, TYPE_PRICE[typeOfHouseForm.value]);
  priceForm.setAttribute(`placeholder`, TYPE_PRICE[typeOfHouseForm.value]);
});

// Поля «Время заезда» и «Время выезда» синхронизированы
const validationTime = function (evt) {
  if (evt.currentTarget.name === `timeout`) {
    timeInForm.options.selectedIndex = timeOutForm.options.selectedIndex;
  } else {
    timeOutForm.options.selectedIndex = timeInForm.options.selectedIndex;
  }
};

timeInForm.addEventListener(`change`, validationTime);
timeOutForm.addEventListener(`change`, validationTime);


// Валидация: зависимость кол-ва гостей от кол-ва комнат
// Проверяем количество комнат
const checkRoomNumber = (roomNumber) => {
  switch (roomNumber) {
    case `1`:
      roomNumber = 1;
      break;
    case `2`:
      roomNumber = 2;
      break;
    case `3`:
      roomNumber = 3;
      break;
    case `100`:
      roomNumber = 100;
      break;
  }
  return roomNumber;
};

// Проверяем количество гостей
const checkGuestNumber = (guestNumber) => {
  switch (guestNumber) {
    case `1`:
      guestNumber = 1;
      break;
    case `2`:
      guestNumber = 2;
      break;
    case `3`:
      guestNumber = 3;
      break;
    case `0`:
      guestNumber = 100;
      break;
  }
  return guestNumber;
};

// Устанавливаем выбор количества доступных гостей
const setGuestNumber = (roomNumber, guestNumber) => {
  switch (roomNumber) {
    case 1:
      if (roomNumber !== guestNumber) {
        adFormGuestNumber.setCustomValidity(`1 комната для 1 гостя`);
      } else {
        adFormGuestNumber.setCustomValidity(``);
      }
      break;
    case 2:
      if (!(roomNumber >= guestNumber)) {
        adFormGuestNumber.setCustomValidity(`2 комнаты для 2 гостей или для 1 гостя`);
      } else {
        adFormGuestNumber.setCustomValidity(``);
      }
      break;
    case 3:
      if (!(roomNumber >= guestNumber)) {
        adFormGuestNumber.setCustomValidity(`3 комнаты для 3 гостей, для 2 гостей или для 1 гостя`);
      } else {
        adFormGuestNumber.setCustomValidity(``);
      }
      break;
    case 100:
      if (roomNumber !== guestNumber) {
        adFormGuestNumber.setCustomValidity(`не для гостей`);
      } else {
        adFormGuestNumber.setCustomValidity(``);
      }
  }
};

const setGuestNumbers = () => {
  const roomNumber = checkRoomNumber(adFormRoomNumber.value);
  const guestNumber = checkGuestNumber(adFormGuestNumber.value);
  return setGuestNumber(roomNumber, guestNumber);
};


// Проверяем изменение количества комнат
adFormRoomNumber.addEventListener(`change`, () => {
  setGuestNumbers();
});

// Проверяем изменение количества гостей
adFormGuestNumber.addEventListener(`change`, () => {
  setGuestNumbers();
});

// Значением полей «Ваша фотография» и «Фотография жилья» может быть только изображение.
const setImgFiles = function () {
  document.querySelector(`#avatar`).setAttribute(`accept`, `image/*`);
  document.querySelector(`#images`).setAttribute(`accept`, `image/*`);
};
setImgFiles();

adForm.addEventListener(`submit`, function (evt) {
  evt.preventDefault();
  window.upload(new FormData(adForm), window.message.showSuccess, window.message.showError);
  window.map.deactivatePage();
});

const buttonKeyDownClear = function (evt) {
  if (evt.key === `Enter`) {
    window.map.deactivatePage();
    window.pin.mapPin.removeEventListener(`mousedown`, buttonMouseDownClear);
    window.pin.mapPin.removeEventListener(`keydown`, buttonKeyDownClear);
  }
};

const buttonMouseDownClear = function (evt) {
  if (evt.button === 0) {
    window.map.deactivatePage();
    window.pin.mapPin.removeEventListener(`mousedown`, buttonMouseDownClear);
    window.pin.mapPin.removeEventListener(`keydown`, buttonKeyDownClear);
  }
};

adFormReset.addEventListener(`keydown`, buttonKeyDownClear);
adFormReset.addEventListener(`mousedown`, buttonMouseDownClear);

window.form = {
  setGuestNumbers
};

window.addressForm = addressForm;


