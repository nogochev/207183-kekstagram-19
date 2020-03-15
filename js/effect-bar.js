'use strict';

(function () {
  var EFFECT_ORIGINAL = 'none';

  var EffectClass = {
    NONE: '',
    NAME: 'effects__preview--',
  };

  var imgEdit = document.querySelector('.img-upload__overlay');
  var previewImage = imgEdit.querySelector('.img-upload__preview img');
  var effectFields = imgEdit.querySelector('.img-upload__effects');
  var effectLevel = imgEdit.querySelector('.effect-level');


  var currentEffect = EFFECT_ORIGINAL;

  var getEffectClass = function () {
    return currentEffect === EFFECT_ORIGINAL
      ? EffectClass.NONE
      : EffectClass.NAME + currentEffect;
  };

  var applyEffect = function (effect) {
    currentEffect = effect;

    previewImage.style.filter = '';
    previewImage.className = getEffectClass();

    if (effect === EFFECT_ORIGINAL) {
      hideEffectLevel();
    } else {
      showEffectLevel();
    }
  };

  var onEffectFieldsChange = function (evt) {
    applyEffect(evt.target.value);
  };

  var resetImageEffect = function () {
    applyEffect(EffectClass.NONE);
  };

  var hideEffectLevel = function () {
    effectLevel.classList.add('hidden');
  };

  var showEffectLevel = function () {
    effectLevel.classList.remove('hidden');
  };

  effectFields.addEventListener('change', onEffectFieldsChange);

  window.effectBar = {
    resetFilter: resetImageEffect,
    applyFilter: applyEffect(EFFECT_ORIGINAL),
  };
})();
