'use strict';


var KeyboardKey = {
  ESC: 'Escape',
  ENTER: 'Enter',
};

var MAX_PHOTOS = 25;
var NAMES = [
  'Дмитрий',
  'Максим',
  'Ольга',
  'Иван',
  'Ирина',
  'Даша',
  'Инга',
  'Антон',
  'Катя',
  'Витя'
];

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var userPictures = document.querySelector('.pictures');

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (array) {
  var index = getRandomInteger(0, array.length - 1);
  return array[index];
};

var LikeCount = {
  MIN: 15,
  MAX: 200,
};

var generateAvatar = function () {
  return 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
};

var generateComment = function () {
  return {
    name: getRandomElement(NAMES),
    message: getRandomElement(COMMENTS),
    avatar: generateAvatar()
  };
};

var generateComments = function () {
  var comments = [];
  var numberOfComments = getRandomInteger(0, 10);
  for (var i = 0; i < numberOfComments; i++) {
    var comment = generateComment(i);
    comments.push(comment);
  }

  return comments;
};

var generatePhoto = function (id) {
  return {
    url: 'photos/' + id + '.jpg',
    description: '[описание фото]',
    likes: getRandomInteger(LikeCount.MIN, LikeCount.MAX),
    comments: generateComments(),
  };
};

var generatePhotos = function () {
  var photos = [];
  for (var i = 1; i <= MAX_PHOTOS; i++) {
    var photo = generatePhoto(i);
    photos.push(photo);
  }

  return photos;
};

var renderPicture = function (photo) {
  var picture = photoTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  picture.querySelector('.picture__likes').textContent = photo.likes;

  picture.addEventListener('click', function () {
    showBigPicture(photo);
  });

  return picture;
};

var addPictures = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var picture = renderPicture(photos[i]);
    fragment.appendChild(picture);
  }

  userPictures.appendChild(fragment);
};

var photos = generatePhotos();
addPictures(photos);

// большая фотография

var body = document.querySelector('body');
var bigPicture = document.querySelector('.big-picture');
var socialComments = bigPicture.querySelector('.social__comments');
var socialСommentCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = bigPicture.querySelector('.comments-loader');
var commentTemplate = socialComments.querySelector('.social__comment');
var closePictureButton = bigPicture.querySelector('#picture-cancel');

var renderComment = function (comment) {
  var item = commentTemplate.cloneNode(true);
  var picture = item.querySelector('.social__picture');

  picture.src = comment.avatar;
  picture.alt = comment.name;
  item.querySelector('.social__text').textContent = comment.message;

  return item;
};

// Показ большого фото и заполнение

var onClosePictureButtonEnterDown = function (evt) {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
};

var onBigPictureEscDown = function (evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

var onBigPictureButtonClose = function () {
  closeBigPicture();
};

var showBigPicture = function (picture) {
  fillPictureInfo(picture);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  closePictureButton.addEventListener('keydown', onClosePictureButtonEnterDown);
  document.addEventListener('keydown', onBigPictureEscDown);
  closePictureButton.addEventListener('click', onBigPictureButtonClose);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closePictureButton.removeEventListener('keydown', onClosePictureButtonEnterDown);
  document.removeEventListener('keydown', onBigPictureEscDown);
  closePictureButton.removeEventListener('click', onBigPictureButtonClose);
};


var addComments = function (arr) {
  socialComments.innerHTML = '';
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var newComment = renderComment(arr[i]);
    fragment.appendChild(newComment);
  }

  socialComments.appendChild(fragment);
};

var hideCounts = function () {
  socialСommentCount.classList.add('hidden');
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

// 4 модуль

var imgUpload = document.querySelector('.img-upload__input');
var imgUploadForm = document.querySelector('.img-upload__form');
var imgEdit = document.querySelector('.img-upload__overlay');
var imgEditCancelButton = imgEdit.querySelector('#upload-cancel');
var imgHashtag = imgEdit.querySelector('.text__hashtags');
var imgCommentPreview = imgEdit.querySelector('.text__description');

var isEscapeKey = function (evt) {
  return evt.key === KeyboardKey.ESC;
};

var isEnterKey = function (evt) {
  return evt.key === KeyboardKey.ENTER;
};

var onImgUploadChange = function () {
  openUploadPreview();
};

var onPreviewButtonCloseClick = function () {
  closeUploadPreview();
};

var openUploadPreview = function () {
  imgEdit.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onImgEditEscPress);
};

var closeUploadPreview = function () {
  imgEdit.classList.add('hidden');
  body.classList.remove('modal-open');
  setScale(ScaleValue.MAX);
  imgUploadForm.reset();
  resetImageEffect();
  document.removeEventListener('keydown', onImgEditEscPress);
};

var onImgEditEscPress = function (evt) {
  if (
    isEscapeKey(evt)
    && imgHashtag !== document.activeElement
    && imgCommentPreview !== document.activeElement
  ) {
    closeUploadPreview();
  }
};

imgEditCancelButton.addEventListener('click', onPreviewButtonCloseClick);
imgUpload.addEventListener('change', onImgUploadChange);

// изменение размера превью изображения
var scaleInput = imgEdit.querySelector('.scale__control--value');
var scaleUpButton = imgEdit.querySelector('.scale__control--bigger');
var scaleDownButton = imgEdit.querySelector('.scale__control--smaller');
var imgUploadPreview = imgEdit.querySelector('.img-upload__preview');

var ScaleValue = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

var setImgPreviewScale = function () {
  var newScale = currentScale / 100;
  imgUploadPreview.style.transform = 'scale(' + newScale + ')';
};

var currentScale = ScaleValue.MAX; // значение по умолчанию

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

var previewImage = imgEdit.querySelector('.img-upload__preview img');
var effectFields = imgEdit.querySelector('.img-upload__effects');

var EFFECT_ORIGINAL = 'none';

var EffectClass = {
  NONE: '',
  NAME: 'effects__preview--',
};

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
};

var onEffectFieldsChange = function (evt) {
  applyEffect(evt.target.value);
};

var resetImageEffect = function () {
  applyEffect(EffectClass.NONE);
};

effectFields.addEventListener('change', onEffectFieldsChange);

var hashtagInput = document.querySelector('.text__hashtags');

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

var onHashtagInput = function (evt) {
  var hashtags = evt.target.value.toLowerCase().split(' ');
  var message = validateHashtags(hashtags);

  hashtagInput.setCustomValidity(message);
};

hashtagInput.addEventListener('input', onHashtagInput);
