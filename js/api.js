import {renderThumbnails} from './draw-thumbnails.js';
import {setFilter} from './filters.js';
import {debounce} from './utils/debounce.js';
const DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const FORM_DATA = 'https://23.javascript.pages.academy/kekstagram';

// берем данные с сервера
const getPhotos = () => {
  fetch(DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      // Если ошибки при загрузки данных
      const errorMessage = document.createElement('p');
      errorMessage.style.textAlign = 'center';
      errorMessage.textContent = 'Ошибка загрузки данных';
      document.body.prepend(errorMessage);
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((userPhotos) => {
      renderThumbnails(userPhotos);
      setFilter(userPhotos, debounce(renderThumbnails));
    });
};

/**
 * Отправка данных на сервер с формы
 *
 * @param {*} onSuccess
 * @param {*} onFail
 * @param {*} body
 */
const sendFormData = (onSuccess, onFail, body) => {
  fetch(FORM_DATA,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getPhotos, sendFormData};
