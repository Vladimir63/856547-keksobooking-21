'use strict';

(() => {

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

  const getRandomNumbers = window.getRandomNumbers;
  const createArrFeatures = window.createArrFeatures;
  const createArrPhotos = window.createArrPhotos;

  const getBookingData = function () {
    const markerX = getRandomNumbers(0, 1160);
    const markerY = getRandomNumbers(130, 630);
    const newFeatures = createArrFeatures();
    const newPhotos = createArrPhotos();
    return {
      'author': {
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
        'photos': newPhotos
      },
      'location': {
        'x': markerX,
        'y': markerY
      }
    };
  };

  window.getBookingData = getBookingData;
})();
