'use strict';

(function () {
  var ScaleValue = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
  };

  var imgEdit = document.querySelector('.img-upload__overlay');
  var scaleInput = imgEdit.querySelector('.scale__control--value');
  var scaleUpButton = imgEdit.querySelector('.scale__control--bigger');
  var scaleDownButton = imgEdit.querySelector('.scale__control--smaller');
  var imgUploadPreview = imgEdit.querySelector('.img-upload__preview');

  var setImgPreviewScale = function () {
    var newScale = currentScale / 100;
    imgUploadPreview.style.transform = 'scale(' + newScale + ')';
  };

  var currentScale = ScaleValue.MAX;

  var setScale = function (value) {
    currentScale = value;
    scaleInput.value = value + '%';
    setImgPreviewScale();
  };

  var canScaleIncrease = function () {
    return currentScale + ScaleValue.STEP <= ScaleValue.MAX;
  };

  var canScaleDecrease = function () {
    return currentScale - ScaleValue.STEP >= ScaleValue.MIN;
  };

  var onScaleUpButtonClick = function () {
    if (canScaleIncrease()) {
      setScale(currentScale + ScaleValue.STEP);
    }
  };

  var onScaleDownButtonClick = function () {
    if (canScaleDecrease()) {
      setScale(currentScale - ScaleValue.STEP);
    }
  };

  scaleUpButton.addEventListener('click', onScaleUpButtonClick);
  scaleDownButton.addEventListener('click', onScaleDownButtonClick);

  var scalePreviewDefault = function () {
    setScale(ScaleValue.MAX);
  };

  window.scale = {
    reset: scalePreviewDefault,
  };
})();
