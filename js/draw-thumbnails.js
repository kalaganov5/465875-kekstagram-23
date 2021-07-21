import {createPhotoDescriptions} from './mock/demo-data.js';
// import {createFetch} from './api.js';
import {drawBigPicture, modalBigPicture} from './draw-big-picture.js';
import {modalOpen, whatModalOpen} from './modal.js';

// const renderUserPhotos = createFetch(
//   (photos) => {
//     console.log(photos);
//   },
//   (err) => {
//     console.log(err);
//   },
// );

/**
 * Рендер разметки миниатюр
 * @param {number} quantity - число миниатюр для генерации
 */
const renderThumbnails = (quantity) => {
  const thumbnailsBlock = document.querySelector('.pictures');
  // @ts-ignore
  const thumbnailTemplate = document.querySelector('#picture').content;
  const fragmentThumbnail = document.createDocumentFragment();

  // Создаём миниатюры и ставим в раметку
  createPhotoDescriptions(quantity).forEach(({url, likes, comments, description}) => {
    const thumbnailItem = thumbnailTemplate.cloneNode(true);

    thumbnailItem.querySelector('.picture__img').src = url;

    thumbnailItem.querySelector('.picture__likes').textContent = likes;

    thumbnailItem.querySelector('.picture__comments').textContent = comments.length;

    // Находим и слушаем клик по ссылке
    const link = thumbnailItem.querySelector('.picture');
    link.addEventListener('click', () => {
      drawBigPicture(url, likes, comments, description);
      modalOpen(modalBigPicture);
      whatModalOpen.isModalBigPicture = true;
    });

    fragmentThumbnail.appendChild(thumbnailItem);
  });
  // Добавляем фрагмент в разметку
  thumbnailsBlock.appendChild(fragmentThumbnail);
};

export {renderThumbnails};
