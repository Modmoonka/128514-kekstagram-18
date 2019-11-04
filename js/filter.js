'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  function tenRandomPictures(pictures) {
    var copyPictures = pictures.slice();
    var tenPictures = [];
    for (var i = 0; i <= 9; i++) {
      var random = Math.round(Math.random() * (pictures.length - i - 1));
      tenPictures.push(copyPictures[random]);
      copyPictures.splice(random, 1);
    }
    return tenPictures;
  }

  function discussed(pictures) {
    var copyPictures = pictures.slice();
    return copyPictures.sort(discussedSort);
  }

  function discussedSort(a, b) {
    return b.comments.length - a.comments.length;
  }

  window.filter = {
    debounce: function (cb) {
      var lastTimeout = null;
      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    },
    tenRandomPictures: tenRandomPictures,
    discussed: discussed
  };
})();
