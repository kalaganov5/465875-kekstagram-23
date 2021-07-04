import {isEscapeEvent} from './utils.js';

const modal = document.querySelector('.big-picture');
const body = document.querySelector('body');

/**
 * Очистит разметку для переданного элемента
 * @param {*} commentsList - передаем разметку комметариев
 */
const clearCommentsOnClose = (commentsList) => {
  commentsList.innerHTML = '';
};

/**
 * Открытие модального окна
 */
const modalOpen = function () {
  modal.classList.remove('hidden');
  body.classList.add('modal-open');
};

/**
 * Закрытие модального окна и очистка комментариев к фотографии
 */
const closeModal = function (commentsList) {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');
  clearCommentsOnClose(commentsList);
  
};

const onModalEscape = function (evt, commentsList) {
  if(isEscapeEvent) {
    evt.preventDefault();
    closeModal(commentsList);
  }
};

const drawBigPicture = function (imageUrl, likesNumber, comments, description) {

  modal.querySelector('.big-picture__img').children[0].src = imageUrl;
  modal.querySelector('.likes-count').textContent = likesNumber;
  modal.querySelector('.comments-count').textContent = comments.length;

  // вывод комментария
  const commentsBlock = modal.querySelector('.social__comments');
  const commentsFragment = new DocumentFragment();

  comments.forEach((comment) => {
    const itemComment = document.createElement('li');
    itemComment.setAttribute('class', 'social__comment');

    const imageAuthor = document.createElement('img');
    imageAuthor.setAttribute('class', 'social__picture');
    imageAuthor.setAttribute('src', comment.avatar);
    imageAuthor.setAttribute('alt', comment.name);
    imageAuthor.setAttribute('width', '35');
    imageAuthor.setAttribute('height', 35);

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'social__text');
    paragraph.innerText = comment.message;

    itemComment.appendChild(imageAuthor);
    itemComment.appendChild(paragraph);
    commentsFragment.appendChild(itemComment);
  });

  commentsBlock.appendChild(commentsFragment);

  modal.querySelector('.social__caption').textContent = description;

  modal.querySelector('.social__comment-count').classList.add('hidden');

  modal.querySelector('.comments-loader').classList.add('hidden');

  modalOpen();

  document.addEventListener('keydown', (evt) => {
    onModalEscape(evt, commentsBlock);
  });

  const modalCloseButton = modal.querySelector('#picture-cancel');

  modalCloseButton.addEventListener('click', () => {
    closeModal(commentsBlock);
  });
};

export {drawBigPicture};
