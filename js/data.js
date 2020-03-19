'use strict';

(function () {

  var succsessUploadHandler = function (data) {
    window.load.arrayPictures = data;
    window.gallery.addPictures(window.load.arrayPictures);
  };

  window.load.loadData(succsessUploadHandler);
})();
