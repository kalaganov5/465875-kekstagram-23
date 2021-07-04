import {isEscapeEvent} from './utils.js';
import {commentsBlock} from './draw-big-picture.js';

const modal = document.querySelector('.big-picture');
const body = document.querySelector('body');

/**
 * Вызов обработчика нажатий по клавиши Escape в модальном окне
 */
const onModalEscape = (evt) => {
  if(isEscapeEvent) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeModal();
  }
};

/**
 * Открытие модального окна
 */
const modalOpen = () => {
  modal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscape);
};

/**
 * Закрытие модального окна и очистка комментариев к фотографии
 */
const closeModal = () => {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsBlock.innerHTML = '';
  document.removeEventListener('keydown', onModalEscape);
};

export {modalOpen, closeModal, modal};
