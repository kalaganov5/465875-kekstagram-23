import {closeModal, modal} from './modal.js';
let commentsBlock;

/**
 * Отрисует модальное окно
 * @param {string} imageUrl - адрес изображения
 * @param {string} likesNumber - количество лайков
 * @param {*} comments - массив из комментариев
 * @param {string} description - описание просматриваемой фотографии
 */
const drawBigPicture = (imageUrl, likesNumber, comments, description) => {
  // @ts-ignore
  modal.querySelector('.big-picture__img').children[0].src = imageUrl;
  modal.querySelector('.likes-count').textContent = likesNumber;
  modal.querySelector('.comments-count').textContent = comments.length;

  // рендер комментариев
  commentsBlock = modal.querySelector('.social__comments');

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
  modal.querySelector('.social__caption').textContent = description;
  modal.querySelector('.social__comment-count').classList.add('hidden');
  modal.querySelector('.comments-loader').classList.add('hidden');
  const modalCloseButton = modal.querySelector('#picture-cancel');
  modalCloseButton.addEventListener('click', closeModal);
};

export {drawBigPicture, commentsBlock};
