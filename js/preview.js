'use strict';

(function () {
  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialСommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentTemplate = socialComments.querySelector('.social__comment');
  var closePictureButton = bigPicture.querySelector('#picture-cancel');

  var renderComment = function (comment) {
    var item = commentTemplate.cloneNode(true);
    var picture = item.querySelector('.social__picture');

    picture.src = comment.avatar;
    picture.alt = comment.name;
    item.querySelector('.social__text').textContent = comment.message;

    return item;
  };

  var addComments = function (arr) {
    socialComments.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var newComment = renderComment(arr[i]);
      fragment.appendChild(newComment);
    }

    socialComments.appendChild(fragment);
  };

  var hideCounts = function () {
    socialСommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

  var fillPictureInfo = function (picture) {
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;

    addComments(picture.comments);
    hideCounts();
  };

  var onClosePictureButtonEnterDown = function (evt) {
    if (window.util.isEnterKey(evt)) {
      closeBigPicture();
    }
  };

  var onBigPictureEscDown = function (evt) {
    if (window.util.isEscapeKey(evt)) {
      closeBigPicture();
    }
  };

  var onBigPictureButtonClose = function () {
    closeBigPicture();
  };

  var showBigPicture = function (picture) {
    fillPictureInfo(picture);
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    closePictureButton.addEventListener('keydown', onClosePictureButtonEnterDown);
    document.addEventListener('keydown', onBigPictureEscDown);
    closePictureButton.addEventListener('click', onBigPictureButtonClose);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    closePictureButton.removeEventListener('keydown', onClosePictureButtonEnterDown);
    document.removeEventListener('keydown', onBigPictureEscDown);
    closePictureButton.removeEventListener('click', onBigPictureButtonClose);
  };

  closePictureButton.addEventListener('click', function () {
    window.preview.close();
  });

  window.preview = {
    show: showBigPicture,
    close: closeBigPicture,
  };
})();
