'use strict';

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
  var number11 = getRandomInteger(0, 10);
  for (var j = 0; j < number11; j++) {
    var comment = generateComment(j);
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
