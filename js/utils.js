/**
 * @param {string} string проверяемая строка
 * @param {number} maxLength максимальная длина этой строки
 * @returns true, если строка проходит по длине, и false — если не проходит
 */
const isStringNotLong = function (string, maxLength) {
  return string.length <= maxLength;
};

/**
 * Функцию отлавливает нажатие на Esc клавишу
 * @param {*} evt
 * @return {*}
 */
const isEscapeEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc;'
};

export {isStringNotLong, isEscapeEvent};
