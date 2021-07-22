import {openModal, closeModal, whatModalOpen, body, onModalEscape} from './modal.js';
import {hasInput} from './utils.js';
import {sendFormData} from './api.js';
const SCALE_STEP = 25;
const TEXTAREA_MAX_LENGTH = 140;
const form = document.querySelector('#upload-select-image');
const uploadImage = form.querySelector('#upload-file');
const modalEditImage = document.querySelector('.img-upload__overlay');
const closeModalUpload = form.querySelector('#upload-cancel');
const inputHashtags = form.querySelector('.text__hashtags');
const hashtagPattern = /^#[A-Za-zА-Яа-я0-9-EеЁё]{1,19}$/;
const comment = form.querySelector('.text__description');
const scaleImage = form.querySelector('.img-upload__scale');
const uploadImagePreview = form.querySelector('.img-upload__preview');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');
const effect = form.querySelector('.effects');
const effectSlider = form.querySelector('.effect-level__slider');
const effectValue = form.querySelector('.effect-level__value');
const effectedElements = {element: '', effectClass: ''};
const effectLevelBlock = form.querySelector('.effect-level');
let hashtags;
let closeSuccessModalButton;
let modalSucces;
let closeErrorModalButton;
let modalError;

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const effectSliderHandler = (value) => {
  if (effectedElements.element !== '') {
    if (effectedElements.effectClass === 'effects__preview--chrome') {
      effectedElements.element.style.filter = `grayscale(${value})`;
    } else if (effectedElements.effectClass === 'effects__preview--sepia') {
      effectedElements.element.style.filter = `sepia(${value})`;
    } else if (effectedElements.effectClass === 'effects__preview--marvin') {
      effectedElements.element.style.filter = `invert(${value}%)`;
    } else if (effectedElements.effectClass === 'effects__preview--phobos') {
      effectedElements.element.style.filter = `blur(${value}px)`;
    } else if (effectedElements.effectClass === 'effects__preview--heat') {
      effectedElements.element.style.filter = `brightness(${value})`;
    }
  }
};


effectSlider.noUiSlider.on('update', (_, handle, unencoded) => {
  effectValue.value = unencoded[handle];
  effectSliderHandler(effectValue.value);
});

const setSliderParameter = () => {
  if (effectedElements.effectClass === 'effects__preview--chrome' || effectedElements.effectClass === 'effects__preview--sepia') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    });
  } else if (effectedElements.effectClass === 'effects__preview--marvin') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    });
  } else if (effectedElements.effectClass === 'effects__preview--phobos') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
    });
  } else if (effectedElements.effectClass === 'effects__preview--heat') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    });
  }
};


/**
* Эффекты к фотографии
*/
const effectClickHandler = (evt, setDefault) => {
  let classAddedPreview;
  if (evt.target !== undefined && evt.target.classList.contains('effects__preview') && evt.target.classList[1] !== 'effects__preview--none') {
    classAddedPreview = evt.target.classList[1];
    uploadImagePreview.className = 'img-upload__preview';
    uploadImagePreview.classList.add(classAddedPreview);
    // Записываем элементы в массив для работы с эффектами слайдером
    effectedElements.element = uploadImagePreview;
    effectedElements.effectClass = classAddedPreview;
    setSliderParameter();
    // Показываем слайдер
    effectLevelBlock.classList.remove('hidden');
  } else if (setDefault || evt.target.classList[1] === 'effects__preview--none') {
    uploadImagePreview.className = 'img-upload__preview effects__preview--none';
    uploadImagePreview.style.filter = '';
    effectLevelBlock.classList.add('hidden');
  }
};

/**
 * Масштабирование изображения
 */
const imageResizeHandler = (evt, setDefault) => {
  let scale = +scaleValue.value.replace('%', '');
  const imagePreview = uploadImagePreview.querySelector('img');
  if (evt.target === scaleSmaller && scale !== SCALE_STEP) {
    scale -= SCALE_STEP;
    imagePreview.style.transform = `scale(0.${scale})`;
    scaleValue.value = `${scale}%`;
  } else if (evt.target === scaleBigger && scale !== 100) {
    scale += SCALE_STEP;
    imagePreview.style.transform = `scale(0.${scale})`;
    imagePreview.style.transform = `scale(${scale === 100 ? '1' : `0.${scale}`})`;
    scaleValue.value = `${scale}%`;
  } else if (setDefault) {
    imagePreview.style.transform = 'scale(1)';
  }
};

/**
 * Сброс всех изменений в форме
 */
const setFormDefaultValue = () => {
  form.reset();
  imageResizeHandler(false, true);
  effectClickHandler(false, true);
};


/**
 * Находит дубликаты в массиве
 * @param {Array} array - проверяемый массив
 */
const hasDuplicates = (array) => (new Set(array)).size !== array.length;

/**
 * Валидация хэш-тега при вводе
 */
const hashtagValidationLive = () => {
  // Создаём массив из хештегов
  hashtags = inputHashtags.value.toLowerCase().split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags.length === 0) {
      inputHashtags.style.borderColor = 'inherit';
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
      inputHashtags.style.borderColor = 'red';
      inputHashtags.setCustomValidity(`# только вначале ${hashtags[i]}`);
      break;
    } else if (hashtags[i].length > 20) {
      inputHashtags.style.borderColor = 'red';
      inputHashtags.setCustomValidity(`Хэш-тег "${hashtags[i]}" не может быть более 20 символов. У вас ${hashtags[i].length}`);
      break;
    } else if (hasDuplicates(hashtags) && hashtags[hashtags.length - 1] !== '') {
      inputHashtags.style.borderColor = 'red';
      inputHashtags.setCustomValidity(`Такой уже есть. ${hashtags[i].toUpperCase()} и ${hashtags[i].toLowerCase()} равны`);
      break;
    } else if (hashtags.length > 5 && hashtags[hashtags.length - 1] !== '') {
      inputHashtags.style.borderColor = 'red';
      inputHashtags.setCustomValidity(`Не более 5 хэштегов, лишний "${hashtags[hashtags.length - 1]}"`);
      break;
    } else {
      // Конструкция нужно для финальной проверки, например #fafdsaf # #sdafdsadfasf
      for (let j = 0; j < hashtags.length; j++) {
        if (hashtags[j] === '' && hashtags.length > 1) {
          // 1 Проверить что последний хэштег не пустой иначе удалить его
          hashtags.splice(j, 1);
        } else if (hashtagPattern.test(hashtags[j]) === false && hashtags[j] !== '') {
          inputHashtags.style.borderColor = 'red';
          inputHashtags.setCustomValidity(`Хэштег "${hashtags[j]}" не может содержать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
          break;
        } else {
          inputHashtags.style.borderColor = 'inherit';
          inputHashtags.setCustomValidity('');
        }
      }
    }
  }
};

/**
* Намеренно используется function declaration, т.к. при стрелке выходит ошибка использование до объявления
* При установки фокуса в поле ввода комментариев поставит признак true
*/
function inputCommetsFocusIn() {
  hasInput.textarea = true;
  if (comment.value.length <= TEXTAREA_MAX_LENGTH) {
    comment.style.borderColor = 'inherit';
  }
}

/**
* Намеренно используется function declaration, т.к. при стрелке выходит ошибка использование до объявления
* При установке фокуса с поле ввода хэш-тега поставит признак true
*/
function inputHashtagFocusIn() {
  hasInput.hashtags = true;
}

/**
* Намеренно используется function declaration, т.к. при стрелке выходит ошибка использование до объявления
* При снятие фокуса с поле ввода хэш-тега поставит признак false
*/
function inputHashtagFocusOut() {
  hasInput.hashtags = false;
}

/**
 * Закрытие окна
 */
const onModalSuccessClick = (evt) => {
  if (evt.target.matches('.success')) {
    closeSuccessMessage();
  }
};

/**
 * Закрытие окна успешной отправки формы, при нажатие на кнопку
 */
const onSuccessModalCloseButton = () => {
  closeSuccessMessage();
};

/**
 * Показ окна, при успешной отправке фотографии
 */
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  whatModalOpen.isModalSubmit = true;
  body.appendChild(successTemplate);
  document.addEventListener('keydown', onModalEscape);
  closeSuccessModalButton = document.querySelector('.success__button');
  modalSucces = document.querySelector('.success');
  modalSucces.addEventListener('click', onModalSuccessClick);
  closeSuccessModalButton.addEventListener('click', onSuccessModalCloseButton);
};

/**
 * Намеренно используется function declaration, т.к. при стрелке выходит ошибка использование до объявления
 * Удаление окна при упешной отправке изображения
 */
function closeSuccessMessage () {
  whatModalOpen.isModalSubmit = false;
  closeSuccessModalButton.removeEventListener('click', onSuccessModalCloseButton);
  modalSucces.addEventListener('click', onModalSuccessClick);
  modalSucces.remove();
  document.removeEventListener('keydown', onModalEscape);
}

/**
 * Закрытие окна ошибки, по клику кнопке попробовать ещё раз
 */
const onErrorModalCloseButton = () => {
  closeErrorMessage();
};

/**
 * Закрытие окна ошибки, по клику за пределы окна
 */
const onModalErrorsClick = (evt) => {
  if (evt.target.matches('.error')) {
    closeErrorMessage();
  }
};

/**
 * Показ ошибки, если данные не удалось отправить
 */
const showErrorsMessage = () => {
  const successTemplate = document.querySelector('#error').content.cloneNode(true);
  whatModalOpen.isModalError = true;
  body.appendChild(successTemplate);
  document.addEventListener('keydown', onModalEscape);
  closeErrorModalButton = document.querySelector('.error__button');
  modalError = document.querySelector('.error');
  modalError.addEventListener('click', onModalErrorsClick);
  closeErrorModalButton.addEventListener('click', onErrorModalCloseButton);
};

/**
 * Намеренно используется function declaration, т.к. при стрелке выходит ошибка использование до объявления
 * Функция закрывает подчищает после закрытия окна
 */
function closeErrorMessage () {
  whatModalOpen.isModalError = false;
  closeErrorModalButton.removeEventListener('click', onErrorModalCloseButton);
  modalError.addEventListener('click', onModalErrorsClick);
  modalError.remove();
  document.removeEventListener('keydown', onModalEscape);
}

const onSubmitForm = (evt) => {
  evt.preventDefault();
  sendFormData(
    () => {
      closeModalEditImage();
      showSuccessMessage();
    },
    () => {
      closeModalEditImage();
      showErrorsMessage();
    },
    new FormData(evt.target),
  );
};

/**
 * Намеренно используется function declaration, т.к. при стрелке выходит ошибка использование до объявления
 * Закрытие модального окна полноэкранного изображения
 */
function closeModalEditImage () {
  closeModal(modalEditImage);
  setFormDefaultValue();
  closeModalUpload.removeEventListener('click', modalCloseButtonHandler);
  inputHashtags.removeEventListener('input', hashtagValidationLive);
  inputHashtags.removeEventListener('focusout', inputHashtagFocusOut);
  inputHashtags.removeEventListener('focusin', inputHashtagFocusIn);
  comment.removeEventListener('focusout', inputCommetsFocusOut);
  comment.removeEventListener('focusin', inputCommetsFocusIn);
  scaleImage.removeEventListener('click', imageResizeHandler);
  effect.removeEventListener('click', effectClickHandler);
  form.removeEventListener('submit', onSubmitForm);
}

/**
* Намеренно используется function declaration, т.к. при стрелке выходит ошибка использование до объявления
* При снятие фокуса с поле textarea поставит признак false
*/
function inputCommetsFocusOut () {
  hasInput.textarea = false;
  if (comment.value.length > TEXTAREA_MAX_LENGTH) {
    comment.style.borderColor = 'red';
  }
}

/**
 * Намеренно используется function declaration, т.к. при стрелке выходит ошибка использование до объявления
 * Закрытие окна по кнопке Х
 */
function modalCloseButtonHandler() {
  closeModalEditImage();
}

/**
 * Открывает модальное окно если избражение загружено
 */
const trackUploadImage = () => {
  openModal(modalEditImage);
  whatModalOpen.isModalFormEditor = true;
  closeModalUpload.addEventListener('click', modalCloseButtonHandler);
  inputHashtags.addEventListener('input', hashtagValidationLive);
  inputHashtags.addEventListener('focusin', inputHashtagFocusIn);
  inputHashtags.addEventListener('focusout', inputHashtagFocusOut);
  comment.addEventListener('focusout', inputCommetsFocusOut);
  comment.addEventListener('focusin', inputCommetsFocusIn);
  scaleImage.addEventListener('click', imageResizeHandler);
  effect.addEventListener('click', effectClickHandler);
  form.addEventListener('submit', onSubmitForm);
};

/*
* Случшает форму загрузки изображения в редактор и
*/
uploadImage.addEventListener('change', trackUploadImage);

export {closeModalEditImage, inputHashtags, closeSuccessMessage, closeErrorMessage};
