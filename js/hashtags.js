'use strict';


(function () {
  var hashtagInput = document.querySelector('.text__hashtags');

  var onHashtagInput = function (evt) {
    var hashtags = evt.target.value.toLowerCase().split(' ');
    var message = window.validateHashtags(hashtags);

    hashtagInput.setCustomValidity(message);
  };

  hashtagInput.addEventListener('input', onHashtagInput);
})();
