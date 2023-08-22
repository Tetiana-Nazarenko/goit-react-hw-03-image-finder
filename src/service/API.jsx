// Импортируем модуль axios для работы с HTTP-запросами
import axios from 'axios';

// Константа с API-ключом
const API_KEY = '38081191-44fc2de709a1cfc57ee790b0d';

// Устанавливаем базовый URL для всех запросов
axios.defaults.baseURL = 'https://pixabay.com/api/';

// Функция для получения изображений из API Pixabay
export const getImages = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  return response.data;
};
