import {createPhotoDescriptions} from './mock/demo-data.js';

/**
 *
 * @param {*} quantity - число миниатюр для генерации
 * @return {*} Вернёт и поставит в разметку готовые миниатюры
 */
const generateThumbnails = function (quantity) {
  const thumbnailsBlock = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content;
  const fragmentThumbnail = document.createDocumentFragment();

  // Создаём миниатюры и ставим в раметку
  createPhotoDescriptions(quantity).forEach(({url, likes, comments}) => {
    const thumbnailItem = thumbnailTemplate.cloneNode(true);

    const imageSrc = thumbnailItem.querySelector('.picture__img');
    imageSrc.src = url;

    const imageLikes = thumbnailItem.querySelector('.picture__likes');
    imageLikes.textContent = likes;

    const pictureCommentsQuantity = thumbnailItem.querySelector('.picture__comments');
    pictureCommentsQuantity.textContent = comments.length;

    fragmentThumbnail.appendChild(thumbnailItem);
  });

  return thumbnailsBlock.appendChild(fragmentThumbnail); // Добавляем фрагмент в разметку
};

export {generateThumbnails};
