/**
 * @param {string} string проверяемая строка
 * @param {number} maxLength максимальная длина этой строки
 * @returns true, если строка проходит по длине, и false — если не проходит
 */
const isStringNotLong = function (string, maxLength) {
  return string.length <= maxLength;
};

export {isStringNotLong};
