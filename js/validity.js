'use strict';

(function () {
  // Валидация хэштегов
  var hashTag = document.querySelector('.text__hashtags');
  var formImgUpload = document.querySelector('.img-upload__form');
  var formSubmitImg = document.querySelector('.img-upload__submit');

  function isBlank(text) {
    return text === undefined || text === null || text.trim() === '';
  }

  function HashTagValidator() {}

  HashTagValidator.prototype = {
    invalidities: [],
    checkValidity: function (input) {
      if (isBlank(input)) {
        this.invalidities = [];
      } else {
        this.invalidities = [];
        var tags = input.split(' ');
        if (tags.length > 5) {
          // Too much tags
          this.addInvalidity('Слишком много тегов');
        } else {
          var validated = [];
          for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            if (!tag.startsWith('#')) {
              // Тэг не начинается с решетки
              this.addInvalidity('Tэг начинается не с решетки');
            }
            if (tag.length >= 20) {
              // Tag is too long
              this.addInvalidity('Тег слишком длинный');
            }
            if (tag.length <= 1) {
              // Tag is too short (the pound sign only)
              this.addInvalidity('Тег слишком короткий');
            }
            if (contains(tag.substring(1), '#')) {
              // Tags are not separated by whitespace
              this.addInvalidity('Теги не разделены пробелами');
            }
            if (contains(validated, tag.toLowerCase())) {
              // Tag meets twice
              this.addInvalidity('Тег всречается дважды');
            }

            validated.push(tag.toLowerCase());
          }
        }
      }
      return this.invalidities.length === 0;
    },
    addInvalidity: function (message) {
      if (!contains(this.invalidities, message)) {
        this.invalidities.push(message);
      }
    },
    getInvalidities: function () {
      return this.invalidities.join('. \n');
    }
  };


  function contains(elements, needle) {
    var seen = false;
    for (var i = 0; i < elements.length; i++) {
      seen = elements[i] === needle;
      if (seen) {
        break;
      }
    }
    return seen;
  }

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
      if (isBlank(input)) {
        this.invalidities = [];
      } else {
        this.invalidities = [];
        if (input.length > 5) {
          this.addInvalidity('Слишком длинный комментарий. Длина комментария, не более 140 символов');
        }
      }
      return this.invalidities.length === 0;
    },
    addInvalidity: function (message) {
      if (!contains(this.invalidities, message)) {
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
