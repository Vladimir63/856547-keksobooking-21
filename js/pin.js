'use strict';

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const MAX_PIN_ON_MAP = 5;

const getRenderingPins = function (pinsClone) {
  const templateElement = document.createDocumentFragment();

  pinsClone.forEach(function (pinNew) {
    const clonElement = pinTemplate.cloneNode(true);
    const clonImg = clonElement.querySelector(`img`);
    clonElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
    clonElement.setAttribute(`id`, `${pinNew.id}`);
    clonImg.setAttribute(`src`, `${pinNew.author.avatar}`);
    clonImg.setAttribute(`alt`, `${pinNew.offer.title}`);
    templateElement.appendChild(clonElement);
  });
  mapPins.appendChild(templateElement);
};

const addHidden = function () {
  const mapPinsChildren = mapPins.querySelectorAll(`.map__card`);
  let newArray = Array.from(mapPinsChildren);

  for (let i = 0; i < newArray.length; i++) {
    newArray[i].classList.add(`hidden`);
  }
};

const removePins = function () {
  const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  for (let i = 0; i < pins.length; i++) {
    pins[i].remove();
  }
};

const renderPins = function (offers) {
  const amount = offers.slice(0, MAX_PIN_ON_MAP);
  getRenderingPins(amount);
};

map.addEventListener(`click`, function (evt) {

  let target = evt.target;

  if (target.tagName === `IMG`) {
    target = target.parentNode;
  }

  if ((target.classList.contains(`map__pin`)) && (!target.classList.contains(`map__pin--main`))) {
    addHidden();
    const buttonId = target.getAttribute(`id`);
    const card = document.querySelector(`#card__${buttonId}`);
    card.classList.remove(`hidden`);
  }
});

window.getRenderingPins = getRenderingPins;
window.addHidden = addHidden;
window.removePins = removePins;
window.renderPins = renderPins;
