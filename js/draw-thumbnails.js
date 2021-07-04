import {createPhotoDescriptions} from './mock/demo-data.js';
import {drawBigPicture} from './draw-big-picture.js';

/**
 *
 * @param {*} quantity - число миниатюр для генерации
 * @return {*} Вернёт и поставит в разметку готовые миниатюры
 */
const renderThumbnails = function (quantity) {
  const thumbnailsBlock = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content;
  const fragmentThumbnail = document.createDocumentFragment();

  // Создаём миниатюры и ставим в раметку
  createPhotoDescriptions(quantity).forEach(({url, likes, comments, description}) => {
    const thumbnailItem = thumbnailTemplate.cloneNode(true);

    const imageSrc = thumbnailItem.querySelector('.picture__img');
    imageSrc.src = url;

    const imageLikes = thumbnailItem.querySelector('.picture__likes');
    imageLikes.textContent = likes;

    const pictureCommentsQuantity = thumbnailItem.querySelector('.picture__comments');
    pictureCommentsQuantity.textContent = comments.length;

    const link = thumbnailItem.querySelector('.picture');

    link.addEventListener('click', () => {
      drawBigPicture(url, likes, comments, description)
    });

    fragmentThumbnail.appendChild(thumbnailItem);
  });
  // Добавляем фрагмент в разметку
  thumbnailsBlock.appendChild(fragmentThumbnail);
};

export {renderThumbnails};
