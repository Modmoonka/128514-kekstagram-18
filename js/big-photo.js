'use strict';

(function () {

  var DOM = {
    templateComments: document.querySelector('#comments')
      .content
      .querySelector('.social__comment'),
    bigPicture: {
      bigPicture: document.querySelector('.big-picture'),
      url: document.querySelector('.big-picture__img'),
      likes: document.querySelector('.likes-count'),
      commentsCount: document.querySelector('.comments-count'),
      socialCaption: document.querySelector('.social__caption'),
      cancel: document.querySelector('.big-picture__cancel')
    },
    socialComments: document.querySelector('.social__comments')
  };

  function renderComments(comment) {
    var cloneElement = DOM.templateComments.cloneNode(true);
    cloneElement.querySelector('.social__picture').src = comment.avatar;
    cloneElement.querySelector('.social__picture').alt = comment.name;
    cloneElement.querySelector('.social__text').textContent = comment.message;
    return cloneElement;
  }

  function renderBigPhoto(picture) {
    var fragment = document.createDocumentFragment();
    while (DOM.socialComments.firstChild) {
      DOM.socialComments.removeChild(DOM.socialComments.firstChild);
    }
    DOM.bigPicture.url.children[0].src = picture.url;
    DOM.bigPicture.likes.textContent = picture.likes;
    DOM.bigPicture.commentsCount.textContent = picture.comments.length;
    DOM.bigPicture.socialCaption.textContent = picture.description;
    picture.comments.forEach(function (comment) {
      fragment.appendChild(renderComments(comment));
    });

    DOM.socialComments.appendChild(fragment);
  }

  DOM.bigPicture.cancel.addEventListener('click', function () {
    window.util.hide(DOM.bigPicture.bigPicture);
    window.accessKey = -1;
  });

  function render(picture) {
    renderBigPhoto(picture);
    window.util.show(DOM.bigPicture.bigPicture);
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === window.util.KEYCODE.ESC) {
        window.accessKey = -1;
        window.util.hide(DOM.bigPicture.bigPicture);
      }
    });
  }

  window.bigPhoto = {
    render: render
  };
})();
