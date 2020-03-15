'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPicture = function (photo) {
    var picture = photoTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;

    picture.addEventListener('click', function () {
      window.preview.show(photo);
    });

    return picture;
  };

  window.renderPicture = renderPicture;
})();
