'use strict';
(function () {
  var EffectLineRect = {
    LEFT: 0,
    RIGHT: 453,
  };

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var effectLevelPinDefault = function () {
    effectLevelPin.style.left = EffectLineRect.RIGHT + 'px';
    effectLevelDepth.style.width = EffectLineRect.RIGHT + 'px';
  };

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

      if (effectLevelPin.offsetLeft - shift.pinPose >= EffectLineRect.LEFT && effectLevelPin.offsetLeft - shift.pinPose <= EffectLineRect.RIGHT) {
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

  window.slider = {
    effectLevelPinReset: effectLevelPinDefault,
  };
})();
