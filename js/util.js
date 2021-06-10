/**
 * @param {*} min минимальное значение
 * @param {*} max максимальное значение
 * @returns Возвращает случайное число из диапазона от и до
 * Формула взята https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE
 */
const getRandomNumber = function (min, max) {
  if (min === max) {
    return Error('Неверное значение');
  }
  // большее и меньшее вычислим с помощью Math.min и Math.max, чтобы пользователю не запоминать очередность
  // с помощью Math.abs передем отризацтельное число в положительное
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor((Math.max(Math.abs(min), Math.abs(max))));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @param {string} string проверяемая строка
 * @param {number} maxLength максимальная длина этой строки
 * @returns true, если строка проходит по длине, и false — если не проходит
 */
const isStringNotLong = function (string, maxLength) {
  return string.length <= maxLength;
};

export {getRandomNumber, isStringNotLong};
