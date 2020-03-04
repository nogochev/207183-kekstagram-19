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

// Покажите элемент .big-picture, удалив у него класс hidden и заполните его информацией из первого элемента массива с данными:

// Адрес изображения url подставьте как src изображения внутри блока.big-picture__img.
// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
// Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

//     <li class="social__comment">
//     <img
//     class="social__picture"
//     src="{{аватар}}"
//     alt="{{имя комментатора}}"
//     width="35" height="35">
//     <p class="social__text">{{текст комментария}</p>
//     </li>
// Описание фотографии description вставьте строкой в блок .social__caption.

var body = document.querySelector('body');
var bigPicture = document.querySelector('.big-picture');
var socialComments = bigPicture.querySelector('.social__comments');
var testPicture = photos[0];

bigPicture.querySelector('.big-picture__img img').src = testPicture.url;
bigPicture.querySelector('.likes-count').textContent = testPicture.likes;
bigPicture.querySelector('.comments-count').textContent = testPicture.comments.length;
bigPicture.querySelector('.social__caption').textContent = testPicture.description;

var commentList = bigPicture.querySelector('.social__comments');
var commentFragment = document.createDocumentFragment();

commentList.innerHTML = '';

for (var i = 0; i < testPicture.comments.length; i++) {
  var newComment = document.createElement('li');
  newComment.className = 'social__comment';
  newComment.innerHTML = '<img class="social__picture" src="'
    + testPicture.comments[i].avatar
    + '"alt="'
    + testPicture.comments[i].autor
    + '"width="35" height="35"> <p class="social__text">'
    + testPicture.comments[i].message
    + '</p>';
  commentFragment.appendChild(newComment);
}
socialComments.appendChild(commentFragment);

bigPicture.classList.remove('hidden');
