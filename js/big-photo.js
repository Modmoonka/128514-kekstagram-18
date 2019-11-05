'use strict';

(function () {
  var DOMcomments = [];
  var ADD_COUNT_COMMENTS = 5;
  var countShow = 0;

  var DOM = {
    fragment: document.createDocumentFragment(),
    templateComments: document.querySelector('#comments')
      .content
      .querySelector('.social__comment'),
    bigPicture: {
      bigPicture: document.querySelector('.big-picture'),
      url: document.querySelector('.big-picture__img'),
      likes: document.querySelector('.likes-count'),
      commentsCount: document.querySelector('.comments-count'),
      commentsCountShow: document.querySelector('.comments-count-show'),
      socialCaption: document.querySelector('.social__caption'),
      cancel: document.querySelector('.big-picture__cancel'),
      socialComments: document.querySelector('.social__comments'),
      loader: document.querySelector('.comments-loader')
    }
  };

  function renderComments(comment) {
    var cloneElement = DOM.templateComments.cloneNode(true);
    cloneElement.querySelector('.social__picture').src = comment.avatar;
    cloneElement.querySelector('.social__picture').alt = comment.name;
    cloneElement.querySelector('.social__text').textContent = comment.message;
    return cloneElement;
  }

  function getCommentsOfPicture(picture) {
    DOMcomments = [];
    picture.comments.forEach(function (comment) {
      DOMcomments.push(renderComments(comment));
    });
    return DOMcomments;
  }

  function renderFragment() {
    if (DOMcomments.length >= 5) {
      countShow += ADD_COUNT_COMMENTS;
      DOM.bigPicture.commentsCountShow.textContent = countShow;
      for (var i = 1; i <= ADD_COUNT_COMMENTS; i++) {
        DOM.fragment.appendChild(DOMcomments[0]);
        DOMcomments.shift();
      }
    } else {
      countShow += DOMcomments.length;
      DOM.bigPicture.commentsCountShow.textContent = countShow;
      DOMcomments.forEach(function (comment) {
        DOM.fragment.appendChild(comment);
      });
      window.util.hide(DOM.bigPicture.loader);
    }
    DOM.bigPicture.socialComments.appendChild(DOM.fragment);
  }

  function renderBigPhoto(picture) {
    while (DOM.bigPicture.socialComments.firstChild) {
      DOM.bigPicture.socialComments.removeChild(DOM.bigPicture.socialComments.firstChild);
    }
    window.util.show(DOM.bigPicture.loader);
    DOM.bigPicture.url.children[0].src = picture.url;
    DOM.bigPicture.likes.textContent = picture.likes;
    DOM.bigPicture.commentsCount.textContent = picture.comments.length;
    DOM.bigPicture.socialCaption.textContent = picture.description;
    getCommentsOfPicture(picture);
    renderFragment();

    DOM.bigPicture.loader.addEventListener('click', renderFragment);
    document.addEventListener('click', function (e) {
      console.dir(e.target);
    });
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
