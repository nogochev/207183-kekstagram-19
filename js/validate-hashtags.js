'use strict';

(function () {
  var TagLength = {
    MIN: 1,
    MAX: 20,
  };

  var ValidateMessage = {
    NO_ERRORS: '',
    TOO_SHORT: 'Имя должно состоять минимум из ' + TagLength.MIN + '-х символов',
    TOO_LONG: 'Имя должно состоять максимум из ' + TagLength.MAX + '-х символов',
    MORE_FIVE: 'нельзя указать больше пяти хэш-тегов',
    HASH_SYMBOL: 'хэш-тег начинается с символа # (решётка)',
    HASHTAG_TWICE: 'один и тот же хэш-тег не может быть использован дважды',
    NO_SPECIAL_SYMBOLS: 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.;',
  };

  var TAGS_MAX = 5;

  var INVALID_TAG_REGEXP = /\#[^0-9a-zA-Zа-яА-ЯёЁ]+/;

  var validateHashtags = function (hashtags) {
    if (hashtags.length > TAGS_MAX) {
      return ValidateMessage.MORE_FIVE;
    }

    for (var i = 0; i < hashtags.length; i++) {
      var tag = hashtags[i];

      if (tag.length < TagLength.MIN) {
        return ValidateMessage.TOO_SHORT;
      }
      if (tag.length >= TagLength.MAX) {
        return ValidateMessage.TOO_LONG;
      }

      if (tag.lastIndexOf('#') > 0) {
        return ValidateMessage.HASH_SYMBOL;
      }

      if (hashtags.indexOf(tag, i + 1) > -1) {
        return ValidateMessage.HASHTAG_TWICE;
      }

      if (INVALID_TAG_REGEXP.test(tag)) {
        return ValidateMessage.NO_SPECIAL_SYMBOLS;
      }
    }

    return ValidateMessage.NO_ERRORS;
  };

  window.validateHashtags = validateHashtags;
})();
