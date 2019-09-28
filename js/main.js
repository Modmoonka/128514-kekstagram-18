'use strict';

var COUNT_ARRAY = 25;

var DESCRIPTION_PICTURE = ['Классное фото', 'Мой отдых', 'Это мой питомец'];
var NAMES_AVTOR = ['Кеша Лысый', 'Аркадий Паровозкин', 'Инокентий Джигурда', 'Яков Великий', 'Тула Мула', 'Мося Мосянин'];
var MASSAGE = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'В целом всё неплохо. Но не всё.'];
var comments = [];
var objComment = {};

var templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var createComment = function (name, message) {
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

var descriptionFoto = [];
var picture = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var i = 1; i <= COUNT_ARRAY; i++) {
  var objDescription = {};
  objDescription.url = 'photos/' + i + '.jpg';
  objDescription.description = getRandomNumber(0, DESCRIPTION_PICTURE.length - 1);
  objDescription.likes = getRandomNumber(15, 200);
  var randomComment = getRandomNumber(1, 5);
  comments = [];
  for (var j = 1; j < randomComment; j++) {
    comments[j - 1] = createComment(NAMES_AVTOR, MASSAGE);
  }
  objDescription.comments = comments;
  descriptionFoto[i - 1] = objDescription;

  fragment.appendChild(createTemplatePicture(templatePicture, descriptionFoto[i - 1]));
}

picture.appendChild(fragment);
