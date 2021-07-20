import {modalOpen, closeModal, whatModalOpen} from './modal.js';
import {hasInput} from './utils.js';
const form = document.querySelector('#upload-select-image');
const uploadImage = form.querySelector('#upload-file');
const modalEditImage = document.querySelector('.img-upload__overlay');
const closeModalUpload = form.querySelector('#upload-cancel');
const inputHashtags = form.querySelector('.text__hashtags');
const hashtagPattern = /^#[A-Za-zА-Яа-я0-9-EеЁё]{1,19}$/;
const comment = form.querySelector('.text__description');
let hashtags;

/**
 * Находит дубликаты в массиве
 * @param {Array} array - проверяемый массив
 */
const hasDuplicates = (array) => (new Set(array)).size !== array.length;

/**
 * Валидация хэш-тега при вводе
 */
const hashtagValidationLive = () => {
  hasInput.hashtags = true;
  // Создаём массив из хештегов
  hashtags = inputHashtags.value.toLowerCase().split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags.length === 0) {
      inputHashtags.setCustomValidity('');
    } else if (hashtags[i][0] !== '#' && hashtags[i].length >= 1) {
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
      break;
    } else if (hashtags[i].length > 20) {
      inputHashtags.setCustomValidity(`Хэш-тег "${hashtags[i]}" не может быть более 20 символов. У вас ${hashtags[i].length}`);
      break;
    } else if (hasDuplicates(hashtags) && hashtags[hashtags.length - 1] !== '') {
      inputHashtags.setCustomValidity(`Такой уже есть. ${hashtags[i].toUpperCase()} и ${hashtags[i].toLowerCase()} равны`);
      break;
    } else if (hashtags.length > 5 && hashtags[hashtags.length - 1] !== '') {
      inputHashtags.setCustomValidity(`Не более 5 хэштегов, лишний "${hashtags[hashtags.length - 1]}"`);
      break;
    } else {
      // Конструкция нужно для финальной проверки, например #fafdsaf # #sdafdsadfasf
      for (let j = 0; j < hashtags.length; j++) {
        if (hashtags[j] === '' && hashtags.length > 1) {
          // 1 Проверить что последний хэштег не пустой иначе удалить его
          hashtags.splice(j, 1);
        } else if (hashtagPattern.test(hashtags[j]) === false && hashtags[j] !== '') {
          inputHashtags.setCustomValidity(`Хэштег "${hashtags[j]}" не может содержать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
          break;
        } else {
          inputHashtags.setCustomValidity('');
        }
      }
    }
  }
};

/**
* При установки фокуса в поле ввода комментариев поставит признак true
*/
function inputCommetsFocusIn() {
  hasInput.textarea = true;
}

/**
* При снятие фокуса с поле ввода хэш-тега поставит признак false
*/
function inputHashtagFocusOut() {
  hasInput.hashtags = false;
}

/**
 * Закрытие модального окна полноэкранного изображения
 */
const closeModalEditImage = () => {
  closeModal(modalEditImage);
  form.reset();
  closeModalUpload.removeEventListener('click', сloseModalButton);
  inputHashtags.removeEventListener('input', hashtagValidationLive);
  inputHashtags.removeEventListener('focusout', inputHashtagFocusOut);
  comment.removeEventListener('focusout', inputCommetsFocusOut);
  comment.removeEventListener('focusin', inputCommetsFocusIn);
};

/**
* При снятие фокуса с поле textarea поставит признак false
*/
function inputCommetsFocusOut () {
  hasInput.textarea = false;
}

/**
 * Закрытие окна по кнопке Х
 */
function сloseModalButton() {
  closeModalEditImage();
}

/**
 * Открывает модальное окно если избражение загружено
 */
const trackUploadImage = () => {
  modalOpen(modalEditImage);
  whatModalOpen.isModalFormEditor = true;
  closeModalUpload.addEventListener('click', сloseModalButton);
  inputHashtags.addEventListener('input', hashtagValidationLive);
  inputHashtags.addEventListener('focusout', inputHashtagFocusOut);
  comment.addEventListener('focusout', inputCommetsFocusOut);
  comment.addEventListener('focusin', inputCommetsFocusIn);
};

/*
* Случшает форму загрузки изображения в редактор и
*/
uploadImage.addEventListener('change', trackUploadImage);

export {closeModalEditImage, inputHashtags};
