import {getRandomUniqueElements} from './utils.js';
const RANDOM_ITEMS = 10;

/**
 * Фильтрует массив миниатюр и переключает кнопки
 * @param {*} array - массив с данными
 * @param {*} callback - функция генерации миниатюр
 */
const filtering = (array, callback) => {
  const filterForm = document.querySelector('.img-filters');
  filterForm.classList.remove('img-filters--inactive');
  const onClickFilterButton = (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      filterForm.querySelector('.img-filters__button--active')
        .classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      if (evt.target.matches('#filter-random')) {
        const uniquePhotos = getRandomUniqueElements(array, RANDOM_ITEMS);
        callback(uniquePhotos);
      } else if (evt.target.matches('#filter-discussed')) {
        const sortDiscussPhotos = array.slice().sort((a, b) => b.comments.length - a.comments.length);
        callback(sortDiscussPhotos);
      } else {
        // По умолчанию
        callback(array);
      }
    }
  };
  filterForm.addEventListener('click', onClickFilterButton);
};

export {filtering};
