import {createPhotoDescriptions} from './mock/demo-data.js';

const generateThumbnails = function (quantity) {
  const thumbnailsBlock = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content;
  const fragmentThumbnail = document.createDocumentFragment();

  createPhotoDescriptions(quantity).forEach((element) => {
    const thumbnailItem = thumbnailTemplate.cloneNode(true);

    const imageSrc = thumbnailItem.querySelector('.picture__img');
    imageSrc.src = element.url;

    const imageLikes = thumbnailItem.querySelector('.picture__likes');
    imageLikes.textContent = element.likes;

    const pictureCommentsQuantity = thumbnailItem.querySelector('.picture__comments');
    pictureCommentsQuantity.textContent = element.comments.length;

    fragmentThumbnail.appendChild(thumbnailItem);
  });

  return thumbnailsBlock.appendChild(fragmentThumbnail); // Добавляем фрагмент в разметку
};

export {generateThumbnails};
