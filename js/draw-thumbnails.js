import {createPhotoDescriptions} from './mock/demo-data.js';

const generateThumbnails = function (quantity) {
  const thumbnailsBlock = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content;
  const fragmentPictures = document.createDocumentFragment();

  createPhotoDescriptions(quantity).forEach((element) => {
    const elementPicture = thumbnailTemplate.cloneNode(true);

    const pictureSrc = elementPicture.querySelector('.picture__img');
    pictureSrc.src = element.url;

    const pictureLike = elementPicture.querySelector('.picture__likes');
    pictureLike.textContent = element.likes;

    const pictureCommentsCount = elementPicture.querySelector('.picture__comments');
    pictureCommentsCount.textContent = element.comments.length;

    fragmentPictures.appendChild(elementPicture);
  });

  return thumbnailsBlock.appendChild(fragmentPictures); // Добавляем фрагмент в разметку
};

export {generateThumbnails};
