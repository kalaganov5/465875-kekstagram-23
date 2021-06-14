import {getRandomNumber} from '../utils.js';

const commentsId = []; // Без массива случайное и уникальное число, не нашёл способа создавать, на будущее поизучаю, но сейчас думаю этого решения достаточно
/**
 * Вернёт случайное и уникальное число, а затем положит в массив commentsId для получение уникального числа в будущем
 * !С функцией есть проблема, если создавать например 9999 уникальных случайных id, то вылетит undefined из за цикличности
 * @return {number}
 */
const getCommentId = function () {
  const randomId = getRandomNumber(1, 9999);
  if (commentsId.indexOf(randomId) === -1) {
    commentsId.push(randomId);
    return randomId;
  }
  getCommentId(); // Повторно вызов себя, чтобы получить другое число, если полученное занято
};

export {getCommentId};
