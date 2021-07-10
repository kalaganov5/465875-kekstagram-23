import {modalOpen, closeModal, whatModalOpen} from './modal.js';
import {hasInput} from './utils.js';
const form = document.querySelector('#upload-select-image');
const uploadImage = form.querySelector('#upload-file');
const modalEditImage = document.querySelector('.img-upload__overlay');
const closeModalUpload = form.querySelector('#upload-cancel');
const inputHashtags = form.querySelector('.text__hashtags');
const hashtagPattern = /^#[A-Za-zА-Яа-я0-9-EеЁё]{1,19}$/;

const hasDuplicates = (array) => (new Set(array)).size !== array.length;

let hashtags;

const hashtagValidationLive = () => {
  hasInput.hashtags = true;
  // Создаём массив из хештегов
  hashtags = inputHashtags.value.toLowerCase().split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i][0] !== '#' && hashtags[i].length >= 1) {
      // начинаем с решетки, иначе ставим
      // Добавляем у вводимого элемента #
      hashtags.splice(i, 1, `#${hashtags[i]}`);
      // Ставим в поле ввода
      inputHashtags.value = hashtags.join(' ');
    } else if (hashtags.length === 2 && hashtags[0] === '' && hashtags[1] === '') {
      // Условие если первый символ пробел, при старте набора
      hashtags.splice(hashtags.length - 1, 1);
      inputHashtags.value = hashtags.join(' ');
    } else if (hashtags.length > 2 && hashtags[i] === '' && hashtags[i - 1] === '' && hashtags[hashtags.length - 1] === '') {
      // Второй пробел удаляем
      hashtags.splice(hashtags.length - 1, 1);
      inputHashtags.value = hashtags.join(' ');
    } else if (hashtags[i].indexOf('#', 2) !== -1 || hashtags[i][1] === '#') {
      // Проверка вторым символом или последующим #
      inputHashtags.setCustomValidity(`# только вначале ${hashtags[i]}`);
    } else if (hashtags[i].length > 20) {
      inputHashtags.setCustomValidity(`Хэш-тег "${hashtags[i]}" не может быть более 20 символов. У вас ${hashtags[i].length}`);
    } else if (hasDuplicates(hashtags) && hashtags[hashtags.length - 1] !== '') {
      inputHashtags.setCustomValidity(`Такой уже есть. ${hashtags[i].toUpperCase()} и ${hashtags[i].toLowerCase()} равны`);
    } else if (hashtags.length > 5 && hashtags[hashtags.length - 1] !== '') {
      inputHashtags.setCustomValidity(`Не более 5 хэштегов, лишний "${hashtags[hashtags.length - 1]}"`);
    } else {
      inputHashtags.setCustomValidity('');
    }
  }
};

const finalValidate = (evt) => {

  evt.preventDefault();
  if (hashtags !== undefined) {
    hashtags.forEach((element, index) => {
      // 1 Проверить что последний хэштег не пустой иначе удалить его
      if (element === '') {
        hashtags.splice(index, 1);
      } else if (hashtagPattern.test(element) === false) {
        inputHashtags.setCustomValidity(`Хэштег "${element}" не может содержать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
      }
    });
  }
  form.reportValidity();
};

/**
 * Закрытие модального окна полноэкранного изображения
 */
const closeModalEditImage = () => {
  closeModal(modalEditImage);
  form.reset();
  closeModalUpload.removeEventListener('click', trackCloseButton);
  inputHashtags.removeEventListener('input', hashtagValidationLive);
  inputHashtags.removeEventListener('focusout', inputHastagFocusOut);

  form.removeEventListener('submit', finalValidate);
};

const inputHastagFocusOut = () => {
  hasInput.hashtags = false;
};

const trackCloseButton = () => {
  closeModalEditImage();
};

/**
 * Открывает модальное окно если избражение загружено
 */
const trackUploadImage = () => {
  modalOpen(modalEditImage);
  whatModalOpen.isModalFormEditor = true;
  closeModalUpload.addEventListener('click', trackCloseButton);
  inputHashtags.addEventListener('input', hashtagValidationLive);
  inputHashtags.addEventListener('focusout', inputHastagFocusOut);
  form.addEventListener('submit', finalValidate);
};

/*
* Случшает форму загрузки изображения в редактор и
*/
uploadImage.addEventListener('change', trackUploadImage);

export {closeModalEditImage, inputHashtags};
