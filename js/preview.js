'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCloseButton = bigPicture.querySelector('#picture-cancel');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentTemplate = bigPictureComments.querySelector('.social__comment');

  var renderComment = function (comment) {
    var item = commentTemplate.cloneNode(true);
    var picture = item.querySelector('.social__picture');

    picture.src = comment.avatar;
    picture.alt = comment.name;
    item.querySelector('.social__text').textContent = comment.message;

    return item;
  };

  var addComments = function (comments) {
    bigPictureComments.innerHTML = '';
    var fragment = document.createDocumentFragment();

    comments.forEach(function (comment) {
      fragment.appendChild(renderComment(comment));
    });

    bigPictureComments.appendChild(fragment);
  };

  var hideCounts = function () {
    bigPictureCommentsCount.classList.add('hidden');
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

  var onBigPictureCloseButtonKeydown = function (evt) {
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
    document.body.classList.add('modal-open');
    bigPictureCloseButton.addEventListener('keydown', onBigPictureCloseButtonKeydown);
    document.addEventListener('keydown', onBigPictureEscDown);
    bigPictureCloseButton.addEventListener('click', onBigPictureButtonClose);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCloseButton.removeEventListener('keydown', onBigPictureCloseButtonKeydown);
    document.removeEventListener('keydown', onBigPictureEscDown);
    bigPictureCloseButton.removeEventListener('click', onBigPictureButtonClose);
  };

  bigPictureCloseButton.addEventListener('click', function () {
    window.preview.close();
  });

  window.preview = {
    show: showBigPicture,
    close: closeBigPicture,
  };
})();
