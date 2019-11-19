'use strict';

(function () {
  var COUNT_COMMENTS = 5;
  var DOMcomments = [];
  var countShow;

  var DOM = {
    fragment: document.createDocumentFragment(),
    templateComment: document.querySelector('#comments')
      .content
      .querySelector('.social__comment'),
    bigPicture: {
      bigPicture: document.querySelector('.big-picture'),
      url: document.querySelector('.big-picture__img'),
      like: document.querySelector('.likes-count'),
      commentsCount: document.querySelector('.comments-count'),
      commentsCountShow: document.querySelector('.comments-count-show'),
      socialCaption: document.querySelector('.social__caption'),
      btnCancel: document.querySelector('.big-picture__cancel'),
      socialComments: document.querySelector('.social__comments'),
      loader: document.querySelector('.comments-loader')
    }
  };

  function renderComments(comment) {
    var clonedElement = DOM.templateComment.cloneNode(true);
    clonedElement.querySelector('.social__picture').src = comment.avatar;
    clonedElement.querySelector('.social__picture').alt = comment.name;
    clonedElement.querySelector('.social__text').textContent = comment.message;
    return clonedElement;
  }

  function getCommentsOfPicture(picture) {
    DOMcomments = [];
    picture.comments.forEach(function (comment) {
      DOMcomments.push(renderComments(comment));
    });
    return DOMcomments;
  }

  function renderFragment() {
    if (DOMcomments.length >= COUNT_COMMENTS) {
      countShow += COUNT_COMMENTS;
      DOM.bigPicture.commentsCountShow.textContent = countShow;
      for (var i = 1; i <= COUNT_COMMENTS; i++) {
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
    countShow = 0;
    while (DOM.bigPicture.socialComments.firstChild) {
      DOM.bigPicture.socialComments.removeChild(DOM.bigPicture.socialComments.firstChild);
    }
    window.util.show(DOM.bigPicture.loader);
    DOM.bigPicture.url.children[0].src = picture.url;
    DOM.bigPicture.like.textContent = picture.likes;
    DOM.bigPicture.commentsCount.textContent = picture.comments.length;
    DOM.bigPicture.socialCaption.textContent = picture.description;
    getCommentsOfPicture(picture);
    renderFragment();

    DOM.bigPicture.loader.addEventListener('click', renderFragment);
  }

  DOM.bigPicture.btnCancel.addEventListener('click', function () {
    window.util.hide(DOM.bigPicture.bigPicture);
    window.accessKey = -1;
    document.body.classList.remove('modal-open');
  });

  function render(picture) {
    console.dir(picture);
    renderBigPhoto(picture);
    window.util.show(DOM.bigPicture.bigPicture);
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === window.util.KEYCODE.ESC) {
        window.accessKey = -1;
        window.util.hide(DOM.bigPicture.bigPicture);
        document.body.classList.remove('modal-open');
      }
    });
  }

  window.bigPhoto = {
    render: render
  };
})();
