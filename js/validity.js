'use strict';

(function () {
  var VALUE_MAX_TAG = 20;
  var VALUE_MIN_TAG = 2;
  var TAG_COUNT = 5;
  var VALUE_MAX_COMMENT = 140;
  function Validator() {
    this.invalidities = {
      hashTag: [],
      comment: []
    };
  }

  Validator.prototype.invalidities = [];

  Validator.prototype.checkHashTag = function (input) {
    this.invalidities.hashTag = [];
    if (!window.util.isBlank(input)) {
      var tags = input.split(' ');
      if (tags.length > TAG_COUNT) {
        // Too much tags
        this.addInvalidity(window.messages.COMMENT_BODY_TOO_MUCH_TAG, this.invalidities.hashTag);
      } else {
        var validated = [];
        for (var i = 0; i < tags.length; i++) {
          var tag = tags[i];
          if (!tag.startsWith('#')) {
            // Тэг не начинается с решетки
            this.addInvalidity(window.messages.COMMENT_BODY_TAG_NOT_BEGIN_WITH, this.invalidities.hashTag);
          }
          if (tag.length >= VALUE_MAX_TAG) {
            // Tag is too long
            this.addInvalidity(window.messages.COMMENT_BODY_VERY_TOO_LONG, this.invalidities.hashTag);
          }
          if (tag.length <= VALUE_MIN_TAG - 1) {
            // Tag is too short (the pound sign only)
            this.addInvalidity(window.messages.COMMENT_BODY_TOO_SHORT, this.invalidities.hashTag);
          }
          if (window.util.contains(tag.substring(1), '#')) {
            // Tags are not separated by whitespace
            this.addInvalidity(window.messages.COMMENT_BODY_NOT_SEPARATED_BY_SPASEC, this.invalidities.hashTag);
          }
          if (window.util.contains(validated, tag.toLowerCase())) {
            // Tag meets twice
            this.addInvalidity(window.messages.COMMENT_BODY_TAG_MEETS_TWICE, this.invalidities.hashTag);
          }

          validated.push(tag.toLowerCase());
        }
      }
    }
    return this.invalidities.hashTag.length === 0;
  };

  Validator.prototype.checkComments = function (input) {
    this.invalidities.comment = [];
    if (!window.util.isBlank(input)) {
      this.invalidities.comment = [];
      if (input.length > VALUE_MAX_COMMENT) {
        this.addInvalidity(window.messages.COMMENT_BODY_TOO_LONG, this.invalidities.comment);
      }
    }
    return this.invalidities.comment.length === 0;
  };

  Validator.prototype.addInvalidity = function (message, element) {
    if (!window.util.contains(element, message)) {
      element.push(message);
    }
  };

  Validator.prototype.getInvalidities = function (element) {
    return element.join('. \n');
  };

  window.validity = {
    validator: new Validator()
  };
})();
