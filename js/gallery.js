'use strict';

(function () {
  var userPictures = document.querySelector('.pictures');

  var addPictures = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(window.renderPicture(photo));
    });

    userPictures.appendChild(fragment);
  };

  var succsessUpload = function (data) {
    window.load.arrayPictures = data;
    addPictures(window.load.arrayPictures);
  };

  window.load.loadData(succsessUpload);

})();
