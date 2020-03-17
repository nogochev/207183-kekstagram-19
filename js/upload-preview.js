'use strict';

(function () {
  var imgUploadFile = document.querySelector('#upload-file');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadPopup = document.querySelector('.img-upload__overlay');
  var imgUploadCancelButton = imgUploadPopup.querySelector('#upload-cancel');
  var imgHashtag = imgUploadPopup.querySelector('.text__hashtags');
  var imgCommentPreview = imgUploadPopup.querySelector('.text__description');

  var onImgUploadFileChange = function () {
    openUploadPreview();
  };

  var onImgUploadCancelButtonClick = function () {
    closeUploadPreview();
  };

  var openUploadPreview = function () {
    imgUploadPopup.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onImgEditEscPress);
    window.effectBar.applyFilter();
  };

  var closeUploadPreview = function () {
    imgUploadPopup.classList.add('hidden');
    document.body.classList.remove('modal-open');
    window.scale.reset();
    imgUploadForm.reset();
    window.effectBar.resetFilter();

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

  imgUploadCancelButton.addEventListener('click', onImgUploadCancelButtonClick);
  imgUploadFile.addEventListener('change', onImgUploadFileChange);
})();
