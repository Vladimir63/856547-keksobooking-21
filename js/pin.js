'use strict';

(() => {
  const MAP_PINS = 8;
  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const getBookingData = window.getBookingData;

  const getRenderingPins = function (pinsClone) {
    const templateElement = document.createDocumentFragment();

    pinsClone.forEach(function (pinNew, i) {
      const clonElement = pinTemplate.cloneNode(true);
      const clonImg = clonElement.querySelector(`img`);
      clonElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
      clonElement.setAttribute(`id`, `${i}`);
      clonImg.setAttribute(`src`, `${pinNew.autor.avatar}`);
      clonImg.setAttribute(`alt`, `${pinNew.offer.title}`);
      templateElement.appendChild(clonElement);
    });
    mapPins.appendChild(templateElement);
  };


  // Функция создания и заполнения массива
  const getCreatePins = function () {
    const arrPins = [];
    for (let i = 0; i < MAP_PINS; i++) {
      arrPins.push(getBookingData(i)); // Метод push() добавляет один или более элементов в конец массива и возвращает новую длину массива.
    }
    return arrPins;
  };

  const errorHandler = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  // window.load(getCreatePins, errorHandler);

  map.addEventListener(`click`, function (evt) {

    let target = evt.target;

    if (target.tagName === `IMG`) {
      target = target.parentNode;
    }

    if ((target.classList.contains(`map__pin`)) && (!target.classList.contains(`map__pin--main`))) {

      const addHidden = function () {
        const mapPinsChildren = mapPins.querySelectorAll(`.map__card`);
        let newArray = Array.from(mapPinsChildren);

        for (let i = 0; i < newArray.length; i++) {
          newArray[i].classList.add(`hidden`);
        }
      };
      addHidden();

      const buttonId = target.getAttribute(`id`);
      const card = document.querySelector(`#card__${buttonId}`);
      card.classList.remove(`hidden`);
    }
  });

  window.getRenderingPins = getRenderingPins;
  window.getCreatePins = getCreatePins;
  window.pin = {
    render: getCreatePins
  };

})();
