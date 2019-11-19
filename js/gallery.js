'use strict';

(function () {
  var galleryElement = document.querySelector('.pictures');
  var filter = document.querySelectorAll('.img-filters');
  var templatePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var formFilter = document.querySelector('.img-filters__form');
  var fragment = document.createDocumentFragment();

  function renderPicture(picture, id) {
    var element = templatePicture.cloneNode(true);
    element.querySelector('.picture__img').accessKey = id;
    element.querySelector('.picture__img').src = picture.url;
    element.querySelector('.picture__likes').textContent = picture.likes;
    element.querySelector('.picture__comments').textContent = picture.comments.length;
    return element;
  }

  function showPictures(pictures) {
    var filteredPictures = pictures;
    window.util.removeClass(filter, 'img-filters--inactive');
    renderGallery(filteredPictures);
    formFilter.addEventListener('click', window.util.debounce(function (evt) {
      filteredPictures = window.filter.activationFilter(evt.target, pictures);
      renderGallery(filteredPictures);
    }));

    galleryElement.addEventListener('click', function (evt) {
      if (evt.target.accessKey) {
        window.bigPhoto.render(filteredPictures[evt.target.accessKey]);
        document.body.classList.add('modal-open');
      }
    });

    galleryElement.addEventListener('keydown', function (evt) {
      if (evt.target.tagName === 'A') {
        if (evt.keyCode === window.util.KEYCODE.ENTER && evt.target.children[0].accessKey >= 0) {
          window.bigPhoto.render(filteredPictures[evt.target.children[0].accessKey]);
          document.body.classList.add('modal-open');
        }
      }
    });
  }

  function renderGallery(pictures) {
    [].forEach.call(galleryElement.querySelectorAll('.picture'), function (picture) {
      picture.remove();
    });

    pictures.forEach(function (picture, index) {
      fragment.appendChild(renderPicture(picture, index));
    });
    galleryElement.appendChild(fragment);
  }

  window.gallery = {
    showPictures: showPictures
  };
})();
