import {getCommentId} from '../mock/utils.js';
import {getRandomNumber} from '../utils.js';


const NUMBER_PHOTO_DESCRIPTIONS = 25;

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
const createComment = function () {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: USER_COMMENTS[getRandomNumber(0, USER_COMMENTS.length - 1)],
    name: USER_NAME[getRandomNumber(0, USER_NAME.length - 1)],
  };
};

/**
 * Создает объект описания
 * @returns
 */
const createPicturesDescription = function (__, index) {
  return {
    id: ++index,
    url: `photos/${index}.jpg`,
    description: PHOTO_DESCRIPTION[getRandomNumber(0, PHOTO_DESCRIPTION.length - 1)], // Вопрос: JS Doc ругается если указать принимаемый параметр @param {Number}, при передаче (0, PHOTO_DESCRIPTION.length - 1). Какой принимаемый параметр указать?
    likes: getRandomNumber(15, 200),
    // создаем массив случайной длины
    comments: new Array(getRandomNumber(1,5))
      // заполняем массив
      .fill(null)
      // заполяем комментариями
      .map(createComment),
  };
};

const photoDescriptions = new Array(NUMBER_PHOTO_DESCRIPTIONS).fill(null).map(createPicturesDescription);

export {createPicturesDescription, photoDescriptions};
