
'use strict';


const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapPins = document.querySelector(`.map__pins`);

const removeBlock = function (div) {
  div.style.display = `none`;
};

const getCreateCard = function (newCards) {
  const templateElementCard = document.createDocumentFragment();

  for (let i = 0; i < newCards.length; i++) {
    const copyCard = cardTemplate.cloneNode(true);

    const popupTitle = copyCard.querySelector(`.popup__title`);
    const popupTextAddress = copyCard.querySelector(`.popup__text--address`);
    const popupTextPrice = copyCard.querySelector(`.popup__text--price`);
    const popupType = copyCard.querySelector(`.popup__type`);
    const popupTextCapacity = copyCard.querySelector(`.popup__text--capacity`);
    const popupTextTime = copyCard.querySelector(`.popup__text--time`);
    const popupFeatures = copyCard.querySelector(`.popup__features`);
    const popupDescription = copyCard.querySelector(`.popup__description`);
    const popupPhoto = copyCard.querySelector(`.popup__photo`);
    const popupPhotos = copyCard.querySelector(`.popup__photos`);
    const popupAvatar = copyCard.querySelector(`.popup__avatar`);
    const popupClose = copyCard.querySelector(`.popup__close`);

    copyCard.setAttribute(`id`, `card__${newCards[i].id}`);

    copyCard.classList.add(`hidden`);


    popupClose.addEventListener(`click`, function () {
      copyCard.classList.add(`hidden`);
    });


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
    popupAvatar.setAttribute(`src`, `${newCards[i].author.avatar}`);
    if (!newCards[i].author.avatar) {
      removeBlock(popupAvatar);
    }

    // photo
    while (popupPhotos.firstChild) {
      popupPhotos.removeChild(popupPhotos.lastChild);
    }

    for (let j = 0; j < newCards[i].offer.photos.length; j++) {
      const copyPhoto = popupPhoto.cloneNode();
      copyPhoto.setAttribute(`src`, `${newCards[i].offer.photos[j]}`);
      popupPhotos.appendChild(copyPhoto);
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
    templateElementCard.appendChild(copyCard);
  }


  const mapFiltersContainer = mapPins.querySelector(`.map__filters-container`);
  mapPins.insertBefore(templateElementCard, mapFiltersContainer);
};

const removeCards = function () {
  const mapPinsChildren = mapPins.querySelectorAll(`.map__card`);

  for (let i = 0; i < mapPinsChildren.length; i++) {
    mapPinsChildren[i].remove();
  }
};

window.getCreateCard = getCreateCard;
window.removeBlock = removeBlock;
window.removeCards = removeCards;

