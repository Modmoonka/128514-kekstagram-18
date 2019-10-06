'use strict';

var COUNT_ARRAY = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var DESCRIPTION_PICTURE = ['Классное фото', 'Мой отдых', 'Это мой питомец'];
var NAMES_AVTOR = ['Кеша Лысый', 'Аркадий Паровозкин', 'Инокентий Джигурда', 'Яков Великий', 'Тула Мула', 'Мося Мосянин'];
var MASSAGE = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'В целом всё неплохо. Но не всё.'];

var descriptionFoto = [];

var getQuery = function (argumentQuery) {
  return document.querySelector(argumentQuery);
};

var picture = getQuery('.pictures');
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
//showBigFoto(descriptionFoto[0]);


//Загрузка изображения и показ формы редактирования

getQuery('#upload-file').addEventListener('change', function () {
  getQuery('.img-upload__overlay').classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  getQuery('.img-upload__overlay').classList.add('hidden');
  getQuery('#upload-file').value('');
};

getQuery('.img-upload__cancel').addEventListener('click', function () {
  closePopup();
});

getQuery('.img-upload__cancel').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

getQuery('.img-upload__cancel').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
});

//Применение эффекта для изображения и Редактирование размера изображения
getQuery('.effect-level__line').addEventListener('mouseup', function (evt) {
  writeCoordinatLevelPin(evt);
});

function writeCoordinatLevelPin(evt) {
  //var startCoordinat = getQuery('.effect-level__line').offsetLeft +  getQuery('.img-upload__wrapper').offsetLeft + 45;
  var startCoordinat = (getQuery('.img-upload__preview').offsetWidth - getQuery('.effect-level__line').offsetWidth) / 2  + getQuery('.img-upload__wrapper').offsetLeft;
  //var persentLevelPin = Math.round((evt.clientX - startCoordinat) * 100 / 455);

  // if (persentLevelPin > 100) {
  //   persentLevelPin = 100;
  // }
  // if (persentLevelPin < 0) {
  //   persentLevelPin = 0;
  // }
  // console.log(document.querySelector('.effect-level__pin').style.left);
 // getQuery('.effect-level__pin').style.left = evt.clientX;
console.log(startCoordinat);
  console.log(evt.clientX);
}


//Валидация хеш-тегов

validHashTag('#1231111#1111111#88888jjjjj');

function validHashTag(text) {
  var arrayHashTags = text.split('#');
  arrayHashTags.splice(0, 1);
}

