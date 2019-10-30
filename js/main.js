'use strict';
(function () {
  window.service.loadPictures(
      window.gallery.showPictures,
      function (errorCode) {
        switch (errorCode) {
          case window.util.http.ERROR[window.util.http.CODE.NOT_AUTHORIZED]:
            window.util.showPopup('Not authorized', window.util.template.createTemplateError);
            break;
          case window.util.http.ERROR[window.util.http.CODE.NOT_FOUND]:
            window.util.showPopup('Not found', window.util.template.createTemplateError);
            break;
          default:
            window.util.showPopup('Really do not know what the heck happened!=/', window.util.template.createTemplateError);
        }
      }
  );
})();
