'use strict';
(function () {
  var COUNT_PICTURES = 10;
  var PERCENTAGE_TO_PIXEL_FOR_BLUR = 0.03; // количество пикселей (0..3px);
  var PERCENTAGE_TO_PIXEL_BRIGHTNESS = 0.02;
  var PERCENTAGE = 100;
  var buttonFilter = document.querySelectorAll('.img-filters__button');
  var DOM = {
    range: {
      pin: document.querySelector('.effect-level__pin')
    },
    effectslist: {
      effectLevel: document.querySelector('.img-upload__effect-level'),
      effectNone: document.querySelector('.effects__preview--none'),
      effectChrome: document.querySelector('.effects__preview--chrome'),
      effectSepia: document.querySelector('.effects__preview--sepia'),
      effectMarvin: document.querySelector('.effects__preview--marvin'),
      effectPhobos: document.querySelector('.effects__preview--phobos'),
      effectHeat: document.querySelector('.effects__preview--heat')
    },
    image: {
      preview: document.querySelector('.img-upload__preview'),
      image: document.querySelector('.img-upload__preview').children.item(0)
    }
  };

  (function init() {
    // Применение эфекта

    DOM.effectslist.effectNone.addEventListener('click', function (evt) {
      applyEffect(evt.target.classList[1]);
      checkClassAndAddEffect(0);
    });

    DOM.effectslist.effectChrome.addEventListener('click', function (evt) {
      applyEffect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEffect(value);
    });

    DOM.effectslist.effectHeat.addEventListener('click', function (evt) {
      applyEffect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEffect(value);
    });

    DOM.effectslist.effectMarvin.addEventListener('click', function (evt) {
      applyEffect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEffect(value);
    });

    DOM.effectslist.effectPhobos.addEventListener('click', function (evt) {
      applyEffect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEffect(value);
    });

    DOM.effectslist.effectSepia.addEventListener('click', function (evt) {
      applyEffect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEffect(value);
    });
  })();

  function applyEffect(className) {
    DOM.image.preview.children[0].classList = '';
    DOM.image.preview.children[0].classList.add(className);
  }

  function checkClassAndAddEffect(value) {
    switch (DOM.image.preview.children[0].classList[0]) {
      case 'effects__preview--none':
        // filter удаляются
        DOM.image.image.style.filter = '';
        window.util.hide(DOM.effectslist.effectLevel);
        break;
      case 'effects__preview--chrome':
        // grayscale(0..1);
        window.util.show(DOM.effectslist.effectLevel);
        value /= PERCENTAGE;
        DOM.image.image.style.filter = 'grayscale(' + value + ')';
        break;
      case 'effects__preview--sepia':
        // sepia(0..1);
        window.util.show(DOM.effectslist.effectLevel);
        value /= PERCENTAGE;
        DOM.image.image.style.filter = 'sepia(' + value + ')';
        break;
      case 'effects__preview--marvin':
        // invert(0..100%);
        window.util.show(DOM.effectslist.effectLevel);
        value += '%';
        DOM.image.image.style.filter = 'invert(' + value + ')';
        break;
      case 'effects__preview--phobos':
        // blur(0..3px);
        window.util.show(DOM.effectslist.effectLevel);
        value *= PERCENTAGE_TO_PIXEL_FOR_BLUR;
        value += 'px';
        DOM.image.image.style.filter = 'blur(' + value + ')';
        break;
      case 'effects__preview--heat':
        // brightness(1..3);
        window.util.show(DOM.effectslist.effectLevel);
        value *= PERCENTAGE_TO_PIXEL_BRIGHTNESS;
        value += 1;
        DOM.image.image.style.filter = 'brightness(' + value + ')';
        break;
      default:
        // filter удаляются
        DOM.image.image.style.filter = '';
        window.util.hide(DOM.effectslist.effectLevel);
        break;
    }
  }

  function activationFilter(filter, pictures) {
    var drawing;
    switch (filter.id) {
      case 'filter-popular':
        activation(filter);
        drawing = pictures;
        break;
      case 'filter-random':
        activation(filter);
        drawing = randomPicturesGallery(pictures, COUNT_PICTURES);
        break;
      case 'filter-discussed':
        activation(filter);
        drawing = getDiscussed(pictures);
        break;
    }
    return drawing;
  }

  function randomPicturesGallery(pictures, countPictures) {
    var copyPictures = pictures.slice();
    var drawings = [];
    for (var i = 0; i <= countPictures - 1; i++) {
      var random = Math.round(Math.random() * (pictures.length - i - 1));
      drawings.push(copyPictures[random]);
      copyPictures.splice(random, 1);
    }
    return drawings;
  }

  function getDiscussed(pictures) {
    var copyPictures = pictures.slice();
    return copyPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  }

  function activation(element) {
    window.util.removeClass(buttonFilter, 'img-filters__button--active');
    element.classList.add('img-filters__button--active');
  }

  window.filter = {
    activationFilter: activationFilter,
    checkClassAndAddEffect: checkClassAndAddEffect,
    effectLevel: DOM.effectslist.effectLevel
  };
})();
