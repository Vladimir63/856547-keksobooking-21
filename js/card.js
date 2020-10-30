
'use strict';

(() => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapPins = document.querySelector(`.map__pins`);
  const FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];
  const getRandomNumbers = window.getRandomNumbers;
  const unique = window.unique;

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
      // каждой карте добавляем атрибут id
      copyCard.setAttribute(`id`, `card__${i}`);
      // функция, которая добавляет класс `hidden` (как будто на каждую карточку нажал на крестик)
      copyCard.classList.add(`hidden`);

      // добавим обработчик событий на крестик (закрыть)
      popupClose.addEventListener(`click`, function () {
        copyCard.classList.add(`hidden`);
      });

      // добавим обработчик событий на кнопку Esc (закрыть)
      document.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          copyCard.classList.add(`hidden`);
        }
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

      // avatar
      popupAvatar.setAttribute(`src`, `${newCards[i].autor.avatar}`);
      if (!newCards[i].autor.avatar) {
        removeBlock(popupAvatar);
      }

      // photo
      for (let j = 0; j < newCards[i].offer.photos.length; j++) {
        popupPhoto.setAttribute(`src`, `${newCards[i].offer.photos[j]}`);
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
      templateElementCard.appendChild(copyCard); // добавляет узел в конец списка дочерних элементов указанного родительского узла
    }


    const mapFiltersContainer = mapPins.querySelector(`.map__filters-container`);
    mapPins.insertBefore(templateElementCard, mapFiltersContainer);
  };

  window.getCreateCard = getCreateCard;
  window.removeBlock = removeBlock;
  window.createArrFeatures = createArrFeatures;

})();
