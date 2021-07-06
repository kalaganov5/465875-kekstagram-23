import {closeModal} from './modal.js';
let commentsBlock;

const modalBigPicture = document.querySelector('.big-picture');

/**
 * Закрытие модального окна полноэкранного изображения
 */
const closeModalBigPicture = () => {
  closeModal(modalBigPicture);
  commentsBlock.innerHTML = '';
};

/**
 * Отрисует модальное окно
 * @param {string} imageUrl - адрес изображения
 * @param {string} likesNumber - количество лайков
 * @param {*} comments - массив из комментариев
 * @param {string} description - описание просматриваемой фотографии
 */
const drawBigPicture = (imageUrl, likesNumber, comments, description) => {
  // @ts-ignore
  modalBigPicture.querySelector('.big-picture__img').children[0].src = imageUrl;
  modalBigPicture.querySelector('.likes-count').textContent = likesNumber;
  modalBigPicture.querySelector('.comments-count').textContent = comments.length;

  // рендер комментариев
  commentsBlock = modalBigPicture.querySelector('.social__comments');

  const commentsFragment = new DocumentFragment();

  comments.forEach((comment) => {
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
  modalBigPicture.querySelector('.social__caption').textContent = description;
  modalBigPicture.querySelector('.social__comment-count').classList.add('hidden');
  modalBigPicture.querySelector('.comments-loader').classList.add('hidden');
  const modalCloseButton = modalBigPicture.querySelector('#picture-cancel');
  modalCloseButton.addEventListener('click', closeModalBigPicture);
};

export {drawBigPicture, modalBigPicture, closeModalBigPicture};
