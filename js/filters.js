import {renderThumbnails} from './draw-thumbnails.js';

/**
 * Фильтрует массив миниатюр и переключает кнопки
 * @param {*} array - массив с данными
 * @param {*} callback - функция генерации миниатюр
 */
const filtering = (array, callback) => {
  const filterForm = document.querySelector('.img-filters');
  filterForm.classList.remove('img-filters--inactive');
  const onClickFilterButton = (evt) => {
    filterForm.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    if (evt.target.matches('.img-filters__button')) {
      evt.target.classList.add('img-filters__button--active');
      renderThumbnails(array.slice(0, 10));
      if (evt.target.matches('#filter-random')) {
        console.log('Рандомные')
      } else if (evt.target.matches('#filter-discussed')) {
        console.log('Обсуждаемые')
      } else {
        // По умолчанию
        console.log('По умолчанию')
      }
    }
  };
  filterForm.addEventListener('click', onClickFilterButton);
};

export {filtering};
