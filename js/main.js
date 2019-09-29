'use strict';

var COUNT_ARRAY = 25;

var DESCRIPTION_PICTURE = ['Классное фото', 'Мой отдых', 'Это мой питомец'];
var NAMES_AVTOR = ['Кеша Лысый', 'Аркадий Паровозкин', 'Инокентий Джигурда', 'Яков Великий', 'Тула Мула', 'Мося Мосянин'];
var MASSAGE = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'В целом всё неплохо. Но не всё.'];

var descriptionFoto = [];

var picture = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var templateCommentsHTML = document.querySelector('#comments')
  .content
  .querySelector('.social__comment');

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
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

var createTemplatePicture = function (template, object) {
  var cloneElement = template.cloneNode(true);
  cloneElement.querySelector('.picture__img').src = object.url;
  cloneElement.querySelector('.picture__likes').textContent = object.likes;
  cloneElement.querySelector('.picture__comments').textContent = object.comments.length;
  return cloneElement;
};

var createDescriptionFoto = function () {
  for (var i = 1; i <= COUNT_ARRAY; i++) {
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

var showDescriptionFoto = function () {
  createDescriptionFoto();
  for (var i = 1; i <= COUNT_ARRAY; i++) {
    fragment.appendChild(createTemplatePicture(templatePicture, descriptionFoto[i - 1]));
  }
  picture.appendChild(fragment);
};

var getComments = function (template, objAutor) {
  var cloneElement = template.cloneNode(true);
  cloneElement.querySelector('.social__picture').src = objAutor.avatar;
  cloneElement.querySelector('.social__picture').alt = objAutor.name;
  cloneElement.querySelector('.social__text').textContent = objAutor.message;
  return cloneElement;
};

var showBigFoto = function (object) {
  var bigPicture = document.querySelector('.big-picture');
  var socialComments = document.querySelector('.social__comments');
  var fragmentComment = document.createDocumentFragment();
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').children[0].src = object.url;
  bigPicture.querySelector('.likes-count').textContent = object.likes;
  bigPicture.querySelector('.comments-count').textContent = object.comments.length;
  bigPicture.querySelector('.social__caption').textContent = object.description;
  for (var k = 0; k <= object.comments.length - 1; k++) {
    fragmentComment.appendChild(getComments(templateCommentsHTML, object.comments[k]));
  }
  socialComments.appendChild(fragmentComment);
  return bigPicture;
};

showDescriptionFoto();
showBigFoto(descriptionFoto[0]);
