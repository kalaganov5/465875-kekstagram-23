import {closeModalBigPicture} from './draw-big-picture.js';
import {closeModalEditImage} from './handler-form.js';
import {hasInput} from './utils.js';

const body = document.querySelector('body');
const whatModalOpen = {
  isModalBigPicture: false,
  isModalFormEditor: false,
};

/**
 * Вызов обработчика нажатий по клавиши Escape в модальном окне
 */
const onModalEscape = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc;') {
    evt.preventDefault();
    if (hasInput.hashtags || hasInput.textarea) {
      evt.stopPropagation();
    } else if (whatModalOpen.isModalBigPicture) {
      closeModalBigPicture();
    } else if (whatModalOpen.isModalFormEditor) {
      closeModalEditImage();
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

export {modalOpen, closeModal, whatModalOpen};
