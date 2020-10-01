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
  const newMin = Math.ceil(min); //Округляет аргумент до ближайшего большего целого.
  const newMax = Math.floor(max); // Округляет аргумент до ближайшего меньшего целого.
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};

// Функция создания случайного объявления
const getBookingData = function () {
  const markerX = getRandomNumbers(0, 1160);
  const markerY = getRandomNumbers(130, 630);
  return {
    'autor': {
      'avatar': `img/avatars/user0${getRandomNumbers(1, 8)}.png`
    },
    'offer': {
      'title': TITLES[(getRandomNumbers(0, 7))],
      'address': `${markerX}, ${markerY}`,
      'price': getRandomNumbers(500, 5000),
      'type': TYPE[(getRandomNumbers(0, 3))],
      'rooms': getRandomNumbers(0, 5),
      'quests': getRandomNumbers(0, 5),
      'checkin': TIME[(getRandomNumbers(0, 2))],
      'checkuot': TIME[(getRandomNumbers(0, 2))],
      'features': Array(getRandomNumbers(1, 4)).fill(FEATURES[getRandomNumbers(0, FEATURES.length - 1)]),
      'description': Array(getRandomNumbers(1, 4)).fill(DESCRIPTIONS[getRandomNumbers(0, DESCRIPTIONS.length - 1)]),
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
    clonElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`); //Добавляет новый атрибут или изменяет значение существующего атрибута у выбранного элемента.
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
