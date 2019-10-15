'use strict';

(function () {
  // Валидация хэштегов
  var hashTag = document.querySelector('.text__hashtags');
  var formImgUpload = document.querySelector('.img-upload__form');
  var formSubmitImg = document.querySelector('.img-upload__submit');

  function HashTagValidator() {}

  HashTagValidator.prototype = {
    invalidities: [],
    checkValidity: function (input) {
      if (window.util.isBlank(input)) {
        this.invalidities = [];
      } else {
        this.invalidities = [];
        var tags = input.split(' ');
        if (tags.length > 5) {
          // Too much tags
          this.addInvalidity(window.messages.COMMENT_BODY_TOO_MUCH_TAG);
        } else {
          var validated = [];
          for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            if (!tag.startsWith('#')) {
              // Тэг не начинается с решетки
              this.addInvalidity(window.messages.COMMENT_BODY_TAG_NOT_BEGIN_WITH);
            }
            if (tag.length >= 20) {
              // Tag is too long
              this.addInvalidity(window.messages.COMMENT_BODY_VERY_TOO_LONG);
            }
            if (tag.length <= 1) {
              // Tag is too short (the pound sign only)
              this.addInvalidity(window.messages.COMMENT_BODY_TOO_SHORT);
            }
            if (window.util.contains(tag.substring(1), '#')) {
              // Tags are not separated by whitespace
              this.addInvalidity(window.messages.COMMENT_BODY_NOT_SEPARATED_BY_SPASEC);
            }
            if (window.util.contains(validated, tag.toLowerCase())) {
              // Tag meets twice
              this.addInvalidity(window.messages.COMMENT_BODY_TAG_MEETS_TWICE);
            }

            validated.push(tag.toLowerCase());
          }
        }
      }
      return this.invalidities.length === 0;
    },
    addInvalidity: function (message) {
      if (!window.util.contains(this.invalidities, message)) {
        this.invalidities.push(message);
      }
    },
    getInvalidities: function () {
      return this.invalidities.join('. \n');
    }
  };

  var hashTagValidator = new HashTagValidator();

  formSubmitImg.addEventListener('click', function () {
    if (!hashTagValidator.checkValidity(hashTag.value)) {
      var customValidityMessage = hashTagValidator.getInvalidities();
      hashTag.setCustomValidity(customValidityMessage);
    } else {
      hashTag.setCustomValidity('');
      formImgUpload.submit();
    }
  });

  // validation comments

  var formSubmitComments = document.querySelector('.social__footer-btn');
  var comment = document.querySelector('.social__footer-text');

  function CommentsValidator() {}

  CommentsValidator.prototype = {
    invalidities: [],
    checkValidity: function (input) {
      if (window.util.isBlank(input)) {
        this.invalidities = [];
      } else {
        this.invalidities = [];
        if (input.length > 5) {
          this.addInvalidity(window.messages.COMMENT_BODY_TOO_LONG);
        }
      }
      return this.invalidities.length === 0;
    },
    addInvalidity: function (message) {
      if (!window.util.contains(this.invalidities, message)) {
        this.invalidities.push(message);
      }
    },
    getInvalidities: function () {
      return this.invalidities.join('. \n');
    }
  };

  var commentsValidator = new CommentsValidator();

  formSubmitComments.addEventListener('click', function () {
    if (!commentsValidator.checkValidity(comment.value)) {
      var customValidityMessageComments = commentsValidator.getInvalidities();
      comment.setCustomValidity(customValidityMessageComments);
    } else {
      comment.setCustomValidity('');
      sendComment();
    }
  });

  function sendComment() {
  }
})();
