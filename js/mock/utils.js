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

const commentsId = []; // Без массива случайное и уникальное число, не нашёл способа создавать, на будущее поизучаю, но сейчас думаю этого решения достаточно
/**
 * Вернёт случайное и уникальное число, а затем положит в массив commentsId для получение уникального числа в будущем
 * !С функцией есть проблема, если создавать например 9999 уникальных случайных id, то вылетит undefined из за цикличности
 * @return {number}
 */
const getCommentId = () => {
  const randomId = getRandomNumber(1, 9999);
  if (commentsId.indexOf(randomId) === -1) {
    commentsId.push(randomId);
    return randomId;
  }
  getCommentId(); // Повторно вызов себя, чтобы получить другое число, если полученное занято
};

export {getCommentId, getRandomNumber};
