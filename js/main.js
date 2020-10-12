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
function unique(arr) {
  let result = [];

  for (let str of arr) {
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

map.classList.remove(`map--faded`); // 2 часть

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
    // const popupFeature = copyCard.querySelector(`.popup__feature`); // Преимущество
    const popupFeatures = copyCard.querySelector(`.popup__features`); // Блок с преимуществами
    const popupDescription = copyCard.querySelector(`.popup__description`);
    const popupPhoto = copyCard.querySelector(`.popup__photo`);
    const popupPhotos = copyCard.querySelector(`.popup__photos`);
    const popupAvatar = copyCard.querySelector(`.popup__avatar`);

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

    // type
    // 1-способ
    // if (newCards[i].offer.type === "flat") {
    //   popupType.textContent = "Квартира";
    // } else if (newCards[i].offer.type === "bungalow") {
    //   popupType.textContent = "Бунгало";
    // } else if (newCards[i].offer.type === "house") {
    //   popupType.textContent = "Дом";
    // } else if (newCards[i].offer.type === "palace") {
    //   popupType.textContent = "Дворец";
    // }

    // 2-способ
    // switch (newCards[i].offer.type) {
    //   case "flat":
    //     popupType.textContent = "Квартира";
    //     break;
    //   case "bungalow":
    //     popupType.textContent = "Бунгало";
    //     break;
    //   case "house":
    //     popupType.textContent = "Дом";
    //     break;
    //   case "palace":
    //     popupType.textContent = "Дворец";
    //     break;
    //   default: removeBlock(popupType)
    // }


    // 3-способ
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
    // console.log(newCards[i].offer.features);
    if (!newCards[i].offer.features.length) {
      removeBlock(popupFeatures);
    }

    templateElementCard.appendChild(copyCard);// добавляет узел в конец списка дочерних элементов указанного родительского узла

  }


  const mapFiltersContainer = mapPins.querySelector(`.map__filters-container`);
  mapPins.insertBefore(templateElementCard, mapFiltersContainer);
  // map.appendChild(templateElementCard);
};

getCreateCard(pinsData);


