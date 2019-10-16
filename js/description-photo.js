'use strict';

(function () {
  var picture = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var createTemplatePicture = function (template, object) {
    var cloneElement = template.cloneNode(true);
    cloneElement.querySelector('.picture__img').src = object.url;
    cloneElement.querySelector('.picture__likes').textContent = object.likes;
    cloneElement.querySelector('.picture__comments').textContent = object.comments.length;
    return cloneElement;
  };

  for (var i = 1; i <= window.util.COUNT_PICTURES_ON_PAGE; i++) {
    window.util.fragment.appendChild(createTemplatePicture(templatePicture, window.util.descriptionPhoto[i - 1])).accessKey = i;
  }
  picture.appendChild(window.util.fragment);
})();
