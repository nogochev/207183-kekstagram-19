'use strict';

var ESC_KEY = 27;
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

// var generatedComments = generateComments();

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
var testPicture = photos[0];
var commentTemplate = socialComments.querySelector('.social__comment');

var renderComment = function (comment) {
  var item = commentTemplate.cloneNode(true);
  var picture = item.querySelector('.social__picture');

  picture.src = comment.avatar;
  picture.alt = comment.name;
  item.querySelector('.social__text').textContent = comment.message;

  return item;
};

var showBigPicture = function () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  return bigPicture;
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

  addComments(generateComments());
  hideCounts();
};

body.classList.add('modal-open');
fillPictureInfo(testPicture);
showBigPicture();

// 4 модуль

var imgUpload = document.querySelector('.img-upload__input');
// var imgUploadForm = document.querySelector('.img-upload__form');
var imgEdit = document.querySelector('.img-upload__overlay');
var buttonCloseImgEdit = imgEdit.querySelector('.img-upload__cancel');

var onImgUploadChange = function (evt) {
  evt.preventDefault(); // удалить потом эту строку
  document.body.classList.add('modal-open');
  imgEdit.classList.remove('hidden');
  setScale(currentScale);
  document.addEventListener('keydown', onimgEditEscPress);
};

var onButtonCloseImgEditClick = function () {
  document.body.classList.remove('modal-open');
  imgEdit.classList.add('hidden');
  setScale(ScaleValue.MAX);
  setImgPreviewScale(currentScale);
  document.removeEventListener('keydown', onimgEditEscPress);
};

var onimgEditEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    onButtonCloseImgEditClick();
  }
};

// событие показа формы редактирования
// потом заменить на change!!!
imgUpload.addEventListener('click', onImgUploadChange);
// закрытие редактора фото
buttonCloseImgEdit.addEventListener('click', onButtonCloseImgEditClick);

// изменение размера изображения

var scaleInput = imgEdit.querySelector('.scale__control--value');
var scaleUpButton = imgEdit.querySelector('.scale__control--bigger');
var scaleDownButton = imgEdit.querySelector('.scale__control--smaller');
var imgUploadPreview = imgEdit.querySelector('.img-upload__preview');

var ScaleValue = {// перечисление
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

var setImgPreviewScale = function () {
  var newScale = currentScale / 100;
  imgUploadPreview.setAttribute('style', 'transform: scale(' + newScale + ');');
};

var currentScale = ScaleValue.MAX; // значение по умолчанию

var setScale = function (value) {
  currentScale = value;
  scaleInput.value = value + '%';
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
    setImgPreviewScale(currentScale);
  }
};

var onScaleDownButtonClick = function () {
  if (canScaleDecrease()) {
    setScale(currentScale - ScaleValue.STEP);
    setImgPreviewScale(currentScale);
  }
};

scaleUpButton.addEventListener('click', onScaleUpButtonClick);
scaleDownButton.addEventListener('click', onScaleDownButtonClick);
