'use strict';

(function () {
  var body = document.querySelector('body');
  var imgUpload = document.querySelector('.img-upload__input');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgEdit = document.querySelector('.img-upload__overlay');
  var imgEditCancelButton = imgEdit.querySelector('#upload-cancel');
  var imgHashtag = imgEdit.querySelector('.text__hashtags');
  var imgCommentPreview = imgEdit.querySelector('.text__description');

  var EFFECT_ORIGINAL = 'none';

  var onImgUploadChange = function () {
    openUploadPreview();
  };

  var onPreviewButtonCloseClick = function () {
    closeUploadPreview();
  };

  var openUploadPreview = function () {
    imgEdit.classList.remove('hidden');
    body.classList.add('modal-open');
    window.effectBar.applyEffect(EFFECT_ORIGINAL);

    document.addEventListener('keydown', onImgEditEscPress);
  };

  var closeUploadPreview = function () {
    imgEdit.classList.add('hidden');
    body.classList.remove('modal-open');
    imgUploadForm.reset();
    window.effectBar.resetImageEffect();

    document.removeEventListener('keydown', onImgEditEscPress);
  };

  var onImgEditEscPress = function (evt) {
    if (
      window.util.isEscapeKey(evt)
      && imgHashtag !== document.activeElement
      && imgCommentPreview !== document.activeElement
    ) {
      closeUploadPreview();
    }
  };

  imgEditCancelButton.addEventListener('click', onPreviewButtonCloseClick);
  imgUpload.addEventListener('change', onImgUploadChange);
})();
