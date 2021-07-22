import {closeModalBigPicture} from './draw-big-picture.js';
import {closeModalEditImage, closeSuccessMessage, closeErrorMessage} from './handler-form.js';
import {hasInput} from './utils.js';

const body = document.querySelector('body');
const whatModalOpen = {
  isModalBigPicture: false,
  isModalFormEditor: false,
  isModalSubmit: false,
  isModalError: false,
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
    } else if (whatModalOpen.isModalSubmit) {
      closeSuccessMessage();
    } else if (whatModalOpen.isModalError) {
      closeErrorMessage();
    }
  }
};

/**
 * Открытие модального окна
 */
const openModal = (elementModal) => {
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

export {openModal, closeModal, whatModalOpen, body, onModalEscape};
