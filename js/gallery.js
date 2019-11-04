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

  function renderPicture(picture, id) {
    var element = templatePicture.cloneNode(true);
    element.querySelector('.picture__img').accessKey = id;
    element.querySelector('.picture__img').src = picture.url;
    element.querySelector('.picture__likes').textContent = picture.likes;
    element.querySelector('.picture__comments').textContent = picture.comments.length;
    return element;
  }

  function renderGallery(pictures) {
    [].forEach.call(galleryElement.querySelectorAll('.picture'), function (element) {
      galleryElement.querySelector('.picture').remove();
    });

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i], i));
    }
    galleryElement.appendChild(fragment);
  }

  window.gallery = {
    showPictures: function (pictures) {
      window.util.removeClass(filter, 'img-filters--inactive');

      renderGallery(pictures);


      formFilteres.addEventListener('click', window.debounce(function (evt) {
        switch (evt.target.id) {
          case 'filter-popular':
            if (!window.util.contains(evt.target.classList, 'img-filters__button--active')) {
              window.util.removeClass(buttonFilter, 'img-filters__button--active');
              evt.target.classList.add('img-filters__button--active');
              renderGallery(pictures);
            }
            break;
          case 'filter-random':
            window.util.removeClass(buttonFilter, 'img-filters__button--active');
            evt.target.classList.add('img-filters__button--active');
            renderGallery([pictures[0], pictures[1]]);
            break;
          case 'filter-discussed':
            window.util.removeClass(buttonFilter, 'img-filters__button--active');
            evt.target.classList.add('img-filters__button--active');
            renderGallery([pictures[2], pictures[3]]);
            break;
        }
      }));


      galleryElement.addEventListener('click', function (evt) {
        if (evt.target.accessKey) {
          window.bigPhoto.render(pictures[evt.target.accessKey]);
        }
      });

      galleryElement.addEventListener('keydown', function (evt) {
        if (evt.target.tagName === 'A') {
          if (evt.keyCode === window.util.KEYCODE.ENTER && evt.target.children[0].accessKey >= 0) {
            window.bigPhoto.render(pictures[evt.target.children[0].accessKey]);
          }
        }
      });
    },
    // onChangeFilter: onChangeFilter
  };
})();
