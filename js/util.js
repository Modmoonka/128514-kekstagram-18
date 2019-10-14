'use strict';

(function () {
  var COUNT_PICTURES_ON_PAGE = 25;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var descriptionFoto = [];
  var DESCRIPTION_PICTURE = ['Классное фото', 'Мой отдых', 'Это мой питомец'];
  var NAMES_AVTOR = ['Кеша Лысый', 'Аркадий Паровозкин', 'Инокентий Джигурда', 'Яков Великий', 'Тула Мула', 'Мося Мосянин'];
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
        objDescription.comments[j] = createComment(NAMES_AVTOR, MASSAGE);
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

  window.util = {
    COUNT_PICTURES_ON_PAGE: COUNT_PICTURES_ON_PAGE,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    fragment: fragment,
    createDescriptionFoto: createDescriptionFoto(),
    descriptionFoto: descriptionFoto
  };
})();
