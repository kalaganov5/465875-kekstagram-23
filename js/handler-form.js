import {modalOpen, closeModal, whatModalOpen} from './modal.js';
const uploadImage = document.querySelector('#upload-file');
const modalEditImage = document.querySelector('.img-upload__overlay');
const closeModalUpload = document.querySelector('#upload-cancel');

/**
 * Закрытие модального окна полноэкранного изображения
 */
const closeModalEditImage = () => {
  closeModal(modalEditImage);
};


/**
 * Открывает модальное окно если избражение загружено
 */
const trackUploadImage = () => {
  modalOpen(modalEditImage);
  whatModalOpen.isModalFormEditor = true;
  closeModalUpload.addEventListener('click', () => {
    closeModalEditImage();
  });
};


/*
* Случшает форму загрузки изображения в редактор и
*/
uploadImage.addEventListener('change', trackUploadImage);


export {modalEditImage};
