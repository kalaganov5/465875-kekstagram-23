import {getCommentId, getRandomNumber} from '../mock/utils.js';

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

/**
 * Создаёт объект комментария
 * @returns
 */
const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: USER_COMMENTS[getRandomNumber(0, USER_COMMENTS.length - 1)],
  name: USER_NAME[getRandomNumber(0, USER_NAME.length - 1)],
});

/**
 * Создает объект описания
 * @returns
 */
const createPicturesDescription = (__, index) => ({
  id: ++index,
  url: `photos/${index}.jpg`,
  description: PHOTO_DESCRIPTION[getRandomNumber(0, PHOTO_DESCRIPTION.length - 1)], // Вопрос: JS Doc ругается если указать принимаемый параметр @param {Number}, при передаче (0, PHOTO_DESCRIPTION.length - 1). Какой принимаемый параметр указать?
  likes: getRandomNumber(15, 200),
  // создаем массив случайной длины
  comments: new Array(getRandomNumber(1,15))
  // заполняем массив
    .fill(null)
  // заполяем комментариями
    .map(createComment),
});

/**
 * Фунций по генерации массива с демо данными
 * @param {Number} howMuchData - размер массива для генерации данных
 * @return {*}
 */
const createPhotoDescriptions = (howMuchData) => new Array(howMuchData).fill(null).map(createPicturesDescription);

export {createPhotoDescriptions};
