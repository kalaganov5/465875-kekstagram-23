import {isEscapeEvent} from './utils.js';
import {clearCommentsOnClose} from './draw-big-picture.js';

const modal = document.querySelector('.big-picture');
const body = document.querySelector('body');

/**
 * Вызов обработчика нажатий по клавиши Escape в модальном окне
 */
const onModalEscape = function (evt) {
  if(isEscapeEvent) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeModal();
  }
};

/**
 * Открытие модального окна
 */
const modalOpen = function () {
  modal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscape);
};

/**
 * Закрытие модального окна и очистка комментариев к фотографии
 */
const closeModal = function () {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');
  clearCommentsOnClose();
  document.removeEventListener('keydown', onModalEscape);
};

export {modalOpen, closeModal, modal};
