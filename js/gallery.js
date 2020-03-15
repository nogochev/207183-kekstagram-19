'use strict';

(function () {
  var userPictures = document.querySelector('.pictures');

  var addPictures = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var picture = window.renderPicture(photos[i]);
      fragment.appendChild(picture);
    }

    userPictures.appendChild(fragment);
  };

  var photos = window.data.generatePhotos();
  addPictures(photos);
})();
