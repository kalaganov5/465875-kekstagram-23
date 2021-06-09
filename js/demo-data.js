import {getRandomNumber} from './util.js';

const USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_DESCRIPTION = [
  'Хорошее фото',
  'Нормальное фото',
  'Good',
];

const USER_NAME = [
  'Коля',
  'Маша',
  'Вася',
  'Надя',
];

const userID = [];
const urlID = [];
const photoID = [100];

/**
 * Вернет новый ID и запишет его в конец массива
 *
 * @param {Array} array - массив с которым будем работать
 * @return {Number}
 */
const createID = function (array) {
  array.length === 0 ? array.push(0) : true; // Проверяем не пустой ли массив, если пусто добавит 0
  const currentID = array[array.length -1] + 1;
  array.push(currentID);
  return currentID;
};

/**
 * Создаёт объект комментария
 * @returns
 */
const createArrayComments = () => ({
  id: createID(photoID),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: USER_COMMENTS[getRandomNumber(0, USER_COMMENTS.length - 1)],
  name: USER_NAME[getRandomNumber(0, USER_NAME.length - 1)],
});

/**
 * Создает объект описания
 * @returns
 */
const createArrayUserDescription = () => ({
  id: createID(userID),
  url: `photos/${createID(urlID)}.jpg`,
  description: PHOTO_DESCRIPTION[getRandomNumber(0, PHOTO_DESCRIPTION.length - 1)], // Вопрос: JS Doc ругается если указать принимаемый параметр @param {Number}, при передаче (0, PHOTO_DESCRIPTION.length - 1). Какой принимаемый параметр указать?
  likes: getRandomNumber(15, 200),
  // создаем массив случайной длины
  comments: new Array(getRandomNumber(1,5))
    // заполняем массив
    .fill(null)
    // заполяем комментариями
    .map(createArrayComments),
});

export {createArrayUserDescription};
