'use strict';

(function () {

  var KeyboardKey = {
    ESC: 'Escape',
    ENTER: 'Enter',
  };

  var isEscapeKey = function (evt) {
    return evt.key === KeyboardKey.ESC;
  };

  var isEnterKey = function (evt) {
    return evt.key === KeyboardKey.ENTER;
  };

  window.util = {
    isEscapeKey: isEscapeKey,
    isEnterKey: isEnterKey,
  };
})();
