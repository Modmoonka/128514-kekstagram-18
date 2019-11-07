'use strict';

(function () {
  var galleryElement = document.querySelector('.pictures');
  var filter = document.querySelectorAll('.img-filters');
  var templatePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var formFilteres = document.querySelector('.img-filters__form');
  var buttonFilter = document.querySelectorAll('.img-filters__button');
  var fragment = document.createDocumentFragment();

  function active(element) {
    window.util.removeClass(buttonFilter, 'img-filters__button--active');
    element.classList.add('img-filters__button--active');
  }

  function renderPicture(picture, id) {
    var element = templatePicture.cloneNode(true);
    element.querySelector('.picture__img').accessKey = id;
    element.querySelector('.picture__img').src = picture.url;
    element.querySelector('.picture__likes').textContent = picture.likes;
    element.querySelector('.picture__comments').textContent = picture.comments.length;
    return element;
  }

  function showPictures(pictures) {
    window.util.removeClass(filter, 'img-filters--inactive');
    var pict = pictures;
    renderGallery(pict);
    formFilteres.addEventListener('click', window.filter.debounce(function (evt) {
      switch (evt.target.id) {
        case 'filter-popular':
          if (!window.util.contains(evt.target.classList, 'img-filters__button--active')) {
            active(evt.target);
            pict = pictures;
            renderGallery(pict);
          }
          break;
        case 'filter-random':
          active(evt.target);
          pict = window.filter.tenRandomPictures(pictures);
          renderGallery(pict);
          break;
        case 'filter-discussed':
          active(evt.target);
          pict = window.filter.discussed(pictures);
          renderGallery(pict);
          break;
      }
    }));

    galleryElement.addEventListener('click', function (evt) {
      if (evt.target.accessKey) {
        window.bigPhoto.render(pict[evt.target.accessKey]);
      }
    });

    galleryElement.addEventListener('keydown', function (evt) {
      if (evt.target.tagName === 'A') {
        if (evt.keyCode === window.util.KEYCODE.ENTER && evt.target.children[0].accessKey >= 0) {
          window.bigPhoto.render(pict[evt.target.children[0].accessKey]);
        }
      }
    });
  }

  function renderGallery(pictures) {
    [].forEach.call(galleryElement.querySelectorAll('.picture'), function () {
      galleryElement.querySelector('.picture').remove();
    });

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i], i));
    }
    galleryElement.appendChild(fragment);
  }

  window.gallery = {
    showPictures: showPictures
  };
})();
