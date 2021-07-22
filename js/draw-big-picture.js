import {closeModal} from './modal.js';
const COMMENTS_STEP = 5;
const modalBigPicture = document.querySelector('.big-picture');
const modalCloseButton = modalBigPicture.querySelector('#picture-cancel');
const moreCommentsButton = modalBigPicture.querySelector('.comments-loader');
const commentsCountFromElement = modalBigPicture.querySelector('.comments-count--from');
const hiddenComments = [];
let commentsCountFrom = COMMENTS_STEP;
let commentsBlock;

/**
 * Скрывает кнопку загрузки комментариев
 *
 */
const hideMoreLoadButton = () => {
  moreCommentsButton.classList.add('hidden');
};

/**
 * Показ ещё 5 комментариев по кнопке "Загрузить ещё"
 *
 */
const commentsLoadHandler = () => {
  for(let i = 0; i < 5; i++) {
    hiddenComments[0].classList.remove('hidden');
    hiddenComments.splice(0, 1);
    commentsCountFromElement.textContent++;
    if (hiddenComments.length === 0) {
      hideMoreLoadButton();
      break;
    }
  }
};

/**
 * Закрытие модального окна полноэкранного изображения
 */
const closeModalBigPicture = () => {
  closeModal(modalBigPicture);
  commentsBlock.innerHTML = '';
  modalCloseButton.removeEventListener('click', closeModalBigPicture);
  if (hiddenComments.length !== 0) {
    // Удаляем обработчик если ставили
    moreCommentsButton.removeEventListener('click', commentsLoadHandler);
  }
};

/**
 * Отрисует модальное окно
 * @param {string} imageUrl - адрес изображения
 * @param {string} likesNumber - количество лайков
 * @param {*} comments - массив из комментариев
 * @param {string} description - описание просматриваемой фотографии
 */
const drawBigPicture = (imageUrl, likesNumber, comments, description) => {
  modalBigPicture.querySelector('.big-picture__img').children[0].src = imageUrl;
  modalBigPicture.querySelector('.likes-count').textContent = likesNumber;
  commentsCountFromElement.textContent = COMMENTS_STEP;
  if (comments.length <= COMMENTS_STEP) {
    commentsCountFrom = comments.length;
    commentsCountFromElement.textContent = commentsCountFrom;
  }
  modalBigPicture.querySelector('.comments-count').textContent = comments.length;

  // рендер комментариев
  commentsBlock = modalBigPicture.querySelector('.social__comments');

  const commentsFragment = new DocumentFragment();
  // commentsCount = comments.length;
  comments.forEach((comment, index) => {

    const itemComment = document.createElement('li');
    itemComment.setAttribute('class', 'social__comment');
    hideMoreLoadButton();
    if (index > COMMENTS_STEP - 1) {
      itemComment.setAttribute('class', 'social__comment hidden');
      hiddenComments.push(itemComment);
      moreCommentsButton.classList.remove('hidden');
    }
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
  modalBigPicture.querySelector('.social__caption').textContent = description;
  modalCloseButton.addEventListener('click', closeModalBigPicture);
  if (hiddenComments.length !== 0) {
    // Ставим обработчик на кнопку
    moreCommentsButton.addEventListener('click', commentsLoadHandler);
  }
};

export {drawBigPicture, modalBigPicture, closeModalBigPicture, modalCloseButton};
