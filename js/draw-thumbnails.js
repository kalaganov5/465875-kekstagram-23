import {drawBigPicture, modalBigPicture} from './draw-big-picture.js';
import {modalOpen, whatModalOpen} from './modal.js';

/**
 * Очистка разметки миниатюр, нужен если работает фильтр
 */
const clearThumbnail = () => {
  const thumbnailsOld = document.querySelectorAll('.picture');
  for(let i = 0; i < thumbnailsOld.length; i++) {
    thumbnailsOld[i].remove();
  }
};

/**
 * Рендер разметки миниатюр
 * @param {Array} array - Массив с данными
 */
const renderThumbnails = (array) => {
  const thumbnailsBlock = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content;
  const fragmentThumbnail = document.createDocumentFragment();

  // Создаём миниатюры и ставим в раметку
  array.forEach(({url, likes, comments, description}) => {
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
  clearThumbnail();
  // Добавляем фрагмент в разметку
  thumbnailsBlock.appendChild(fragmentThumbnail);
};

export {renderThumbnails};
