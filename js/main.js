'use strict';

// объявим переменные
const MAP_PINS = 8;

const TITLES = [
  `И снова Токио`,
  `И снова Берлин`,
  `И снова Лондон`,
  `И снова Нью-Йорк`,
  `И снова Вена`,
  `И снова Москва`,
  `И снова Рим`,
  `И снова Мадрид`
];

const TYPE = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

const TIME = [
  `12:00`,
  `13:00`,
  `14:00`
];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const DESCRIPTIONS = [
  `Больше напоминает старую будку, но зато чисто`,
  `Отлиное расположение для любителей искусства, рядом расположена Кексогалерея и музей восковых фигур Мисье Кекса`,
  `Шикарные аппартаменты в самом центре кошачьего гетто`,
  `Люкс в центре города с видом на статую Великого Кекса`,
  `Простенькая комнатушка в кошачьей коммуналке`,
  `Шалаш на дереве в центральном парке города, отличное место для уединения с природой в шумном мегаполисе`,
  `Шикарный дворец для избранных котов, в котором каждый кот почувствует себя как король`,
  `Отличное бунгало на берегу океана, к вашим услугам всегда свежая рыба (если поймаете)`
];

const TYPE_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

// Получаем элемент с классом map. Используем селектор.
const map = document.querySelector(`.map`);
// Получаем элементы с классом map__pin. Используем селектор
const mapPins = document.querySelector(`.map__pins`);
// Получаем содержимое из класса map__pin, который находится внутри id=pin
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


// Функция получения случайного целого числа в заданном интервале, включительно
const getRandomNumbers = function (min, max) {
  const newMin = Math.ceil(min); // Округляет аргумент до ближайшего большего целого.
  const newMax = Math.floor(max); // Округляет аргумент до ближайшего меньшего целого.
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};

// Функция создания случайного массива с фичами
const createArrFeatures = function () {
  const arrfeatures = [];
  const arrFeaturesLength = getRandomNumbers(0, FEATURES.length);
  for (let i = 0; i < arrFeaturesLength; i++) {
    const m = Math.floor(Math.random() * FEATURES.length);
    arrfeatures.push(FEATURES[m]);
  }
  const uniqueArrfeatures = unique(arrfeatures);
  return uniqueArrfeatures;
};

// Оставить уникальные элементы массива https://learn.javascript.ru/task/array-unique
function unique(array) {
  let result = [];

  for (let str of array) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}

// Функция создания случайного объявления
const getBookingData = function () {
  const markerX = getRandomNumbers(0, 1160);
  const markerY = getRandomNumbers(130, 630);
  const newFeatures = createArrFeatures();
  return {
    'autor': {
      'avatar': `img/avatars/user0${getRandomNumbers(1, 8)}.png`
    },
    'offer': {
      'title': TITLES[(getRandomNumbers(0, 7))],
      'address': `${markerX}, ${markerY}`,
      'price': getRandomNumbers(500, 5000),
      'type': TYPE[(getRandomNumbers(0, 3))],
      'rooms': getRandomNumbers(1, 5),
      'guests': getRandomNumbers(1, 5),
      'checkin': TIME[(getRandomNumbers(0, 2))],
      'checkuot': TIME[(getRandomNumbers(0, 2))],
      "features": newFeatures,
      'description': DESCRIPTIONS[getRandomNumbers(0, DESCRIPTIONS.length - 1)],
      'photos': Array(getRandomNumbers(1, 4)).fill(PHOTOS[getRandomNumbers(0, PHOTOS.length - 1)])
    },
    'location': {
      'x': markerX,
      'y': markerY
    }
  };
};

// Функция создания и заполнения массива
const getCreatePins = function () {
  const arrPins = [];
  for (let i = 0; i < MAP_PINS; i++) {
    arrPins.push(getBookingData()); // Метод push() добавляет один или более элементов в конец массива и возвращает новую длину массива.
  }
  return arrPins;
};

// Функция отрисовки клонированных элементов
const getRenderingPins = function (pinsClone) {
  const templateElement = document.createDocumentFragment(); // Создает новый пустой DocumentFragment

  pinsClone.forEach(function (pinNew) {
    const clonElement = pinTemplate.cloneNode(true); // возвращает дубликат узла, из которого этот метод был вызван. true, если дети узла должны быть клонированы
    const clonImg = pinTemplate.querySelector(`img`);
    clonElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`); // Добавляет новый атрибут или изменяет значение существующего атрибута у выбранного элемента.
    clonImg.setAttribute(`src`, `${pinNew.autor.avatar}`);
    clonImg.setAttribute(`alt`, `${pinNew.offer.title}`);
    templateElement.appendChild(clonElement); // добавляет узел в конец списка дочерних элементов указанного родительского узла
  }); // 3 часть
  mapPins.appendChild(templateElement); // 4 часть
};

// Присваиваю константе значения функции создания и заполнения массива
const pinsData = getCreatePins(); // 1 часть

getRenderingPins(pinsData);


// _________________module3 - task2_________________

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`); // создаём DOM-элемент объявления (карточка объявления)

const removeBlock = function (div) {
  div.style.display = `none`;
};

const getCreateCard = function (newCards) {
  const templateElementCard = document.createDocumentFragment(); // Создает новый пустой DocumentFragment

  for (let i = 0; i < newCards.length; i++) {
    const copyCard = cardTemplate.cloneNode(true); // возвращает дубликат узла, из которого этот метод был вызван. true, если дети узла должны быть клонированы

    const popupTitle = copyCard.querySelector(`.popup__title`); // собирааем i-ый элемент
    const popupTextAddress = copyCard.querySelector(`.popup__text--address`);
    const popupTextPrice = copyCard.querySelector(`.popup__text--price`);
    const popupType = copyCard.querySelector(`.popup__type`);
    const popupTextCapacity = copyCard.querySelector(`.popup__text--capacity`);
    const popupTextTime = copyCard.querySelector(`.popup__text--time`);
    const popupFeatures = copyCard.querySelector(`.popup__features`); // Блок с преимуществами
    const popupDescription = copyCard.querySelector(`.popup__description`);
    const popupPhoto = copyCard.querySelector(`.popup__photo`);
    const popupPhotos = copyCard.querySelector(`.popup__photos`);
    const popupAvatar = copyCard.querySelector(`.popup__avatar`);
    const popupClose = copyCard.querySelector(`.popup__close`); // popup закрыть

    // добавим обработчик событий на крестик (закрыть)
    popupClose.addEventListener(`click`, function () {
      copyCard.classList.add(`hidden`);
    });

    // title
    popupTitle.textContent = `${newCards[i].offer.title}`;
    if (!newCards[i].offer.title) {
      removeBlock(popupTitle);
    }

    // address
    popupTextAddress.textContent = `${newCards[i].offer.address}`;
    if (!newCards[i].offer.address) {
      removeBlock(popupTextAddress);
    }

    // price
    popupTextPrice.textContent = `${newCards[i].offer.price}₽/ночь`;
    if (!newCards[i].offer.price) {
      removeBlock(popupTextPrice);
    }

    // offer
    const typeTranslate = {
      flat: `квартира`, bungalow: `Бунгало`, house: `Дом`, palace: `Дворец`
    };
    popupType.textContent = typeTranslate[newCards[i].offer.type] || ``;
    if (!newCards[i].offer.type) {
      removeBlock(popupType);
    }

    // capacity
    let roomsCol = ``;
    if (newCards[i].offer.rooms === 1) {
      roomsCol = `${newCards[i].offer.rooms} комната для `;
    } else if (newCards[i].offer.rooms > 1 && newCards[i].offer.rooms < 5) {
      roomsCol = `${newCards[i].offer.rooms} комнаты для `;
    } else if (newCards[i].offer.rooms > 4) {
      roomsCol = `${newCards[i].offer.rooms} комнат для `;
    }

    let guestsCol = ``;
    if (newCards[i].offer.guests === 1) {
      guestsCol = `${newCards[i].offer.guests} гостя.`;
    } else {
      guestsCol = `${newCards[i].offer.guests} гостей.`;
    }
    popupTextCapacity.textContent = roomsCol + guestsCol;
    if (!newCards[i].offer.rooms || !newCards[i].offer.guests) {
      removeBlock(popupTextCapacity);
    }

    // time
    popupTextTime.textContent = `Заезд после ${newCards[i].offer.checkin}, выезд до ${newCards[i].offer.checkuot}`;
    if (!newCards[i].offer.checkin || !newCards[i].offer.checkuot) {
      removeBlock(popupTextTime);
    }

    // description
    popupDescription.textContent = `${newCards[i].offer.description}`;
    if (!newCards[i].offer.description) {
      removeBlock(popupDescription);
    }

    // description
    popupAvatar.setAttribute(`src`, `${newCards[i].autor.avatar}`);
    if (!newCards[i].autor.avatar) {
      popupAvatar.setAttribute(`style`, `display: none`);
    }

    // photo
    for (let j = 0; j < newCards[i].offer.photos.length; j++) {
      popupPhoto.setAttribute(`src`, `${newCards[i].offer.photos[j]}`);
      popupPhotos.appendChild(popupPhoto);
    }
    if (!newCards[i].offer.photos.length) {
      removeBlock(popupPhotos);
    }

    // features
    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.lastChild);
    }

    for (let j = 0; j < newCards[i].offer.features.length; j++) {
      const li = document.createElement(`li`);
      li.setAttribute(`class`, `popup__feature popup__feature--${newCards[i].offer.features[j]}`);
      popupFeatures.appendChild(li);
    }
    if (!newCards[i].offer.features.length) {
      removeBlock(popupFeatures);
    }
    templateElementCard.appendChild(copyCard);// добавляет узел в конец списка дочерних элементов указанного родительского узла
  }


  const mapFiltersContainer = mapPins.querySelector(`.map__filters-container`);
  mapPins.insertBefore(templateElementCard, mapFiltersContainer);
};

getCreateCard(pinsData);


// _________________module4 - task1_________________


const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);

// Блокируем изменение атрибутов формы
for (let i = 0; i < adForm.children.length; i++) {
  adForm.children[i].setAttribute(`disabled`, `disabled`);
}

// Блокируем изменение атрибутов блока фильтров
for (let i = 0; i < mapFilters.children.length; i++) {
  mapFilters.children[i].setAttribute(`disabled`, `disabled`);
}

// cтраница Кексобукинга может находиться в двух режимах: неактивном и активном.В неактивном режиме страница находится сразу после открытия.В этом режиме отключены форма и карта и единственное доступное действие — перемещение метки.map__pin--main, являющейся контролом указания адреса объявления.

const mapPin = document.querySelector(`.map__pin--main`); // главная метка

// Узнаем координаты главной метки еще до активации страницы и записываем его в поле формы адреса
const WIDTH_MAIN_PIN = 62;
const HEIGHT_MAIN_PIN = 62;
const LEFT_MAP_PIN = mapPin.offsetLeft + WIDTH_MAIN_PIN / 2;
const TOP_MAP_PIN = mapPin.offsetTop + HEIGHT_MAIN_PIN / 2;

// Записать данные координат в форму объявления
adForm.querySelector(`#address`).setAttribute(`value`, LEFT_MAP_PIN + `, ` + TOP_MAP_PIN);


// Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние.
// В активном состоянии страница позволяет вносить изменения в форму и отправлять её на сервер, просматривать похожие объявления на карте, фильтровать их и уточнять подробную информацию о них, показывая для каждого из объявлений карточку.
// Функция активации: рисуются метки, активируется карта, блок фильтров, форма.
const activatePage = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  mapFilters.classList.remove(`ad-form--disabled`);
  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].removeAttribute(`disabled`);
  }
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].removeAttribute(`disabled`);
  }

  // Узнаем координаты главной метки еще до активации страницы и записываем его в поле формы адреса


  // Записать данные координат в форму объявления
  adForm.querySelector(`#address`).setAttribute(`value`, LEFT_MAP_PIN + `, ` + TOP_MAP_PIN);
};


// Обработчики событий: активируют страницу кексобукинга
// по нажатию левой кнопки мыши или клавиши Enter(когда метка в фокусе)
const buttonMouseDownHandler = function (evt) {
  if (evt.button === 0) {
    activatePage();
    // Удаляем обработчики
    mapPin.removeEventListener(`mousedown`, buttonMouseDownHandler);
    mapPin.removeEventListener(`keydown`, buttonKeyDownHandler);
  }
};

const buttonKeyDownHandler = function (evt) {
  if (evt.key === `Enter`) {
    activatePage();
    // Удаляем обработчики
    mapPin.removeEventListener(`mousedown`, buttonMouseDownHandler);
    mapPin.removeEventListener(`keydown`, buttonKeyDownHandler);
  }
};

// Вешаем 2 обработчика событий на главную метку
mapPin.addEventListener(`keydown`, buttonKeyDownHandler);
mapPin.addEventListener(`mousedown`, buttonMouseDownHandler);


// Элементы формы DOM
const titleForm = document.querySelector(`#title`);
const priceForm = document.querySelector(`#price`);
const addressForm = document.querySelector(`#address`);
const typeOfHouseForm = document.querySelector(`#type`);
const timeInForm = document.querySelector(`#timein`);
const timeOutForm = document.querySelector(`#timeout`);
const adFormRoomNumber = adForm.querySelector(`#room_number`);
const adFormGuestNumber = adForm.querySelector(`#capacity`);

// Функция ограничений для полей ввода формы объявлений, до валидации формы
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
priceForm.setAttribute(`min`, TYPE_PRICE[typeOfHouseForm.options[typeOfHouseForm.selectedIndex].value]);
priceForm.setAttribute(`placeholder`, TYPE_PRICE[typeOfHouseForm.options[typeOfHouseForm.selectedIndex].value]);

// Вешаем обработчик на изменение типа жилья
typeOfHouseForm.addEventListener(`change`, function (evt) {
  priceForm.setAttribute(`min`, TYPE_PRICE[typeOfHouseForm.options[evt.currentTarget.selectedIndex].value]);
  priceForm.setAttribute(`placeholder`, TYPE_PRICE[typeOfHouseForm.options[evt.currentTarget.selectedIndex].value]);
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
setGuestNumbers();

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
