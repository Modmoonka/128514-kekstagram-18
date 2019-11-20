'use strict';

(function () {
  var gallery = document.querySelector('.pictures');
  var filters = document.querySelectorAll('.img-filters');
  var templatePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var formFilter = document.querySelector('.img-filters__form');
  var fragment = document.createDocumentFragment();

  function renderPicture(picture, id) {
    var element = templatePicture.cloneNode(true);
    var imageElement = element.querySelector('.picture__img');
    imageElement.accessKey = id;
    imageElement.src = picture.url;
    element.querySelector('.picture__likes').textContent = picture.likes;
    element.querySelector('.picture__comments').textContent = picture.comments.length;
    return element;
  }

  function showPictures(pictures) {
    var filteredPictures = pictures;
    window.util.removeClass(filters, 'img-filters--inactive');
    renderGallery(filteredPictures);
    formFilter.addEventListener('click', window.util.debounce(function (evt) {
      filteredPictures = window.filter.activationFilter(evt.target, pictures);
      renderGallery(filteredPictures);
    }));

    gallery.addEventListener('click', function (evt) {
      if (evt.target.accessKey) {
        window.bigPhoto.render(filteredPictures[evt.target.accessKey]);
        document.body.classList.add('modal-open');
      }
    });

    gallery.addEventListener('keydown', function (evt) {
      if (evt.target.tagName === 'A') {
        if (evt.keyCode === window.util.KeyKode.ENTER && evt.target.children[0].accessKey >= 0) {
          window.bigPhoto.render(filteredPictures[evt.target.children[0].accessKey]);
          document.body.classList.add('modal-open');
        }
      }
    });
  }

  function renderGallery(pictures) {

    document.querySelectorAll('.picture').forEach(function (picture) {
      picture.remove();
    });

    pictures.forEach(function (picture, index) {
      fragment.appendChild(renderPicture(picture, index));
    });
    gallery.appendChild(fragment);
  }

  window.gallery = {
    showPictures: showPictures
  };
})();
