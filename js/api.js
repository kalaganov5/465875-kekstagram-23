import {renderThumbnails} from './draw-thumbnails.js';
// const createFetch = (onSuccess, onError) => {
//   fetch('https://23.javascript.pages.academy/kekstagram/data')
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(`${response.status} ${response.statusText}`);
//     })
//     .then((json) => {
//       onSuccess(json);
//     })
//     .catch((err) => {
//       onError(err);
//     });
// };


// берем данные с сервера
fetch('https://23.javascript.pages.academy/kekstagram/data')
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
