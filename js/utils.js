/**
 * @param {*} min минимальное значение
 * @param {*} max максимальное значение
 * @returns Возвращает случайное число из диапазона от и до
 * Формула взята https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE
 */
const getRandomNumber = (min, max) => {
  if (min === max) {
    return Error('Неверное значение');
  }
  // большее и меньшее вычислим с помощью Math.min и Math.max, чтобы пользователю не запоминать очередность
  // с помощью Math.abs передем отризацтельное число в положительное
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor((Math.max(Math.abs(min), Math.abs(max))));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const hasInput = {
  hashtags: false,
  textarea: false,
};

/**
 * Принимает массив, возвращает массив случайных уникальных элементов из исходного массива.
 * @param {Array} array - массив элементов
 */
const getRandomUniqueElements = (array, quantity) => {
  const uniqueItems = [];
  if (quantity > array.length) {
    throw new Error('Новый массив не может превыщать исходный');
  }
  let randomIndex;
  while (uniqueItems.length < quantity) {
    randomIndex = getRandomNumber(0, array.length -1);
    if (!uniqueItems.includes(array[randomIndex])) {
      uniqueItems.push(array[randomIndex]);
    }
  }
  return uniqueItems;
};

export {hasInput, getRandomUniqueElements};
