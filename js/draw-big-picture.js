import {createPhotoDescriptions} from './mock/demo-data.js';
import {isEscapeEvent} from './utils.js';
const photo = createPhotoDescriptions(25);

// Удаляем наложение
const overlay = document.querySelector('.big-picture');
overlay.classList.remove('hidden');

const modalOpen = function () {
  overlay.classList.remove('hidden');
};

// Адрес изображения
const image = overlay.querySelector('.big-picture__img');
image.children[0].src = photo[0].url;

// лайки
const likes = overlay.querySelector('.likes-count');
likes.textContent = photo[0].likes;

// колличество комментариев
const commentsCount = overlay.querySelector('.comments-count');
commentsCount.textContent = photo[0].comments.length;

// вывод комментария
const commentsBlock = overlay.querySelector('.social__comments');
const commentsFragment = new DocumentFragment();

photo[0].comments.forEach((comment) => {
  const itemComment = document.createElement('li');
  itemComment.setAttribute('class', 'social__comment');

  const imageAuthor = document.createElement('img');
  imageAuthor.setAttribute('class', 'social__picture');
  imageAuthor.setAttribute('src', comment.avatar);
  imageAuthor.setAttribute('alt', comment.name);
  imageAuthor.setAttribute('width', '35');
  imageAuthor.setAttribute('height', '35');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'social__text');
  paragraph.innerText = comment.message;

  itemComment.appendChild(imageAuthor);
  itemComment.appendChild(paragraph);
  commentsFragment.appendChild(itemComment);
});
commentsBlock.appendChild(commentsFragment);

const descriptionPhoto = overlay.querySelector('.social__caption');
descriptionPhoto.textContent = photo[0].description;

const commentsRange = overlay.querySelector('.social__comment-count');
commentsRange.classList.add('hidden');

const commentsLoader = overlay.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

const body = document.querySelector('body');
body.classList.add('modal-open');

const modalClose = overlay.querySelector('#picture-cancel');

const closeModal = function () {
  overlay.classList.add('hidden');
};

modalClose.addEventListener('click', closeModal);

document.addEventListener('keydown', (evt) => {
  if(isEscapeEvent) {
    evt.preventDefault();
    overlay.classList.add('hidden');
  }
});
