'use strict';
(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      pinPose: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        pinPose: startCoords.pinPose - moveEvt.clientX
      };

      startCoords = {
        pinPose: moveEvt.clientX
      };

      if (effectLevelPin.offsetLeft - shift.pinPose >= 0 && effectLevelPin.offsetLeft - shift.pinPose <= 453) {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.pinPose) + 'px';
        effectLevelDepth.style.width = effectLevelPin.style.left;
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
