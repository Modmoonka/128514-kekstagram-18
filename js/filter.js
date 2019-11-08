'use strict';
(function () {
  var COUN_TPICTURES = 10;
  var buttonFilter = document.querySelectorAll('.img-filters__button');
  var DOM = {
    effectslist: {
      effectLevel: document.querySelector('.img-upload__effect-level'),
      efectNone: document.querySelector('.effects__preview--none'),
      efectChrome: document.querySelector('.effects__preview--chrome'),
      efectSepia: document.querySelector('.effects__preview--sepia'),
      efectMarvin: document.querySelector('.effects__preview--marvin'),
      efectPhobos: document.querySelector('.effects__preview--phobos'),
      efectHeat: document.querySelector('.effects__preview--heat')
    },
    img: {
      preview: document.querySelector('.img-upload__preview')
    }
  };

  (function init() {
    // Применение эфекта

    DOM.effectslist.efectNone.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      checkClassAndAddEfect(0);
    });

    DOM.effectslist.efectChrome.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEfect(value);
    });

    DOM.effectslist.efectHeat.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEfect(value);
    });

    DOM.effectslist.efectMarvin.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEfect(value);
    });

    DOM.effectslist.efectPhobos.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEfect(value);
    });

    DOM.effectslist.efectSepia.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEfect(value);
    });
  })();

  function applyefect(className) {
    DOM.img.preview.children[0].classList = '';
    DOM.img.preview.children[0].classList.add(className);
  }

  function checkClassAndAddEfect(value) {
    switch (DOM.img.preview.children[0].classList[0]) {
      case 'effects__preview--none':
        DOM.img.preview.style.filter = '';
        window.util.hide(DOM.effectslist.effectLevel);
        break;
      case 'effects__preview--chrome':
        window.util.show(DOM.effectslist.effectLevel);
        value /= 100;
        DOM.img.preview.style.filter = 'grayscale(' + value + ')';
        break;
      case 'effects__preview--sepia':
        window.util.show(DOM.effectslist.effectLevel);
        value /= 100;
        DOM.img.preview.style.filter = 'sepia(' + value + ')';
        break;
      case 'effects__preview--marvin':
        window.util.show(DOM.effectslist.effectLevel);
        value += '%';
        DOM.img.preview.style.filter = 'invert(' + value + ')';
        break;
      case 'effects__preview--phobos':
        window.util.show(DOM.effectslist.effectLevel);
        value *= 0.03;
        value += 'px';
        DOM.img.preview.style.filter = 'blur(' + value + ')';
        break;
      case 'effects__preview--heat':
        window.util.show(DOM.effectslist.effectLevel);
        value *= 0.03;
        DOM.img.preview.style.filter = 'brightness(' + value + ')';
        break;
      default:
        DOM.img.preview.style.filter = '';
        window.util.hide(DOM.effectslist.effectLevel);
        break;
    }
  }

  function activeFilter(filter, pictures) {
    var pict;
    switch (filter.id) {
      case 'filter-popular':
        if (!window.util.contains(filter.classList, 'img-filters__button--active')) {
          active(filter);
          pict = pictures;
        }
        break;
      case 'filter-random':
        active(filter);
        pict = randomPicturesGallery(pictures, COUN_TPICTURES);
        break;
      case 'filter-discussed':
        if (!window.util.contains(filter.classList, 'img-filters__button--active')) {
          active(filter);
          pict = discussed(pictures);
          break;
        }
    }
    return pict;
  }

  function randomPicturesGallery(pictures, countPictures) {
    var copyPictures = pictures.slice();
    var tenPictures = [];
    for (var i = 0; i <= countPictures - 1; i++) {
      var random = Math.round(Math.random() * (pictures.length - i - 1));
      tenPictures.push(copyPictures[random]);
      copyPictures.splice(random, 1);
    }
    return tenPictures;
  }

  function discussed(pictures) {
    var copyPictures = pictures.slice();
    return copyPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  }

  function active(element) {
    window.util.removeClass(buttonFilter, 'img-filters__button--active');
    element.classList.add('img-filters__button--active');
  }

  window.filter = {
    activeFilter: activeFilter,
    checkClassAndAddEfect: checkClassAndAddEfect
  };
})();
