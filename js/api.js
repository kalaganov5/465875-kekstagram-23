import {renderThumbnails} from './draw-thumbnails.js';
const DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const FORM_DATA = 'https://23.javascript.pages.academy/kekstagram';

// берем данные с сервера
const getPhotos = () => {
  fetch(DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      // Здесь должно быть функция показ ошибки при загрузки данных
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((userPhotos) => {
      renderThumbnails(userPhotos);
    });
};

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
