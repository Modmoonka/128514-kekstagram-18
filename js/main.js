'use strict';
(function () {
  window.service.loadPictures(
      window.gallery.showPictures,
      function (errorCode) {
        switch (errorCode) {
          case window.util.Http.ERROR[window.util.Http.CODE.NOT_AUTHORIZED]:
            window.util.showPopup('Not authorized', window.popups.error);
            break;
          case window.util.Http.ERROR[window.util.Http.CODE.NOT_FOUND]:
            window.util.showPopup('Not found', window.popups.error);
            break;
          default:
            window.util.showPopup('Really do not know what the heck happened!=/', window.popups.error);
        }
      }
  );
})();
