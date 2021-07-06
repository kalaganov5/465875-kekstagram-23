import {isEscapeEvent} from './utils.js';
import {closeModalBigPicture} from './draw-big-picture.js';
import {modalEditImage} from './handler-form.js';

const body = document.querySelector('body');
const whatModalOpen = {
  isModalBigPicture: false,
  isModalFormEditor: false,
};

/**
 * Вызов обработчика нажатий по клавиши Escape в модальном окне
 */
const onModalEscape = (evt) => {
  if(isEscapeEvent) {
    evt.preventDefault();
    if (whatModalOpen.isModalBigPicture) {
      closeModalBigPicture();
    }
    if (whatModalOpen.isModalFormEditor) {
      closeModal(modalEditImage);
    }
  }
};

/**
 * Открытие модального окна
 */
const modalOpen = (elementModal) => {
  elementModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscape);
};

/**
 * Закрытие модального окна и очистка комментариев к фотографии
 * @param {object} elementModal - Модальное окно
 */
const closeModal = (elementModal) => {
  elementModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscape);
  // Ставим признак что модальное окно закрыто
  whatModalOpen.isModalBigPicture = false;
  whatModalOpen.isModalFormEditor = false;
};

export {modalOpen, closeModal, onModalEscape, whatModalOpen};
