'use strict';

(function () {
  var COUNT_PICTURES_ON_PAGE = 25;
  var KEYCODE = {
    ESC: 27,
    ENTER: 13
  };
  var descriptionFoto = [];
  var DESCRIPTION_PICTURE = ['Классное фото', 'Мой отдых', 'Это мой питомец'];
  var NAMES_AUTHOR = ['Кеша Лысый', 'Аркадий Паровозкин', 'Инокентий Джигурда', 'Яков Великий', 'Тула Мула', 'Мося Мосянин'];
  var MASSAGE = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'В целом всё неплохо. Но не всё.'];
  var fragment = document.createDocumentFragment();

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var createDescriptionFoto = function () {
    for (var i = 1; i <= COUNT_PICTURES_ON_PAGE; i++) {
      var objDescription = {};
      objDescription.url = 'photos/' + i + '.jpg';
      objDescription.description = DESCRIPTION_PICTURE[getRandomNumber(0, DESCRIPTION_PICTURE.length - 1)];
      objDescription.likes = getRandomNumber(15, 200);
      var randomComment = getRandomNumber(1, 5);
      objDescription.comments = [];
      for (var j = 0; j < randomComment; j++) {
        objDescription.comments[j] = createComment(NAMES_AUTHOR, MASSAGE);
      }
      descriptionFoto[i - 1] = objDescription;
    }
  };

  var createComment = function (name, message) {
    var objComment = {};
    var numberRandom = getRandomNumber(1, 6);
    objComment.avatar = 'img/avatar-' + numberRandom + '.svg';
    var commentRandom = getRandomNumber(0, 1);
    objComment.message = message[commentRandom];
    objComment.name = name[numberRandom - 1];
    return objComment;
  };

  function isBlank(text) {
    return text === undefined || text === null || text.trim() === '';
  }

  function contains(elements, needle) {
    var seen = false;
    for (var i = 0; i < elements.length; i++) {
      seen = elements[i] === needle;
      if (seen) {
        break;
      }
    }
    return seen;
  }

  /**
   * Returns value bounded to the range.
   *
   * @example bound(50, 100, 95)  // 95
   * @example bound(50, 100, 25)  // 50
   * @example bound(50, 100, 125) // 100
   *
   * @param {number} min - minimum that the {@code value} can not be less than.
   * @param {number} max - maximum that the {@code value} can not be greater than.
   * @param {number} value - the value to check whether it is in bounds.
   * @return {number} - the {@code min} if the {@code value} less than the {@code min},
   *                    the {@code max} if the {@code value} greater than the {@code max},
   *                    otherwise the {@code value} itself.
   */
  function bound(min, max, value) {
    return Math.max(min, Math.min(value, max));
  }

  window.util = {
    COUNT_PICTURES_ON_PAGE: COUNT_PICTURES_ON_PAGE,
    KEYCODE: KEYCODE,
    fragment: fragment,
    createDescriptionFoto: createDescriptionFoto(),
    descriptionFoto: descriptionFoto,
    isBlank: isBlank,
    contains: contains,
    bound: bound
  };
})();
