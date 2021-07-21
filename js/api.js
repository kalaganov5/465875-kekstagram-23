import {renderThumbnails} from './draw-thumbnails.js';
const DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';

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

export {getPhotos};
