import { Component } from 'react';

import { getImages } from '../service/API';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class ImageApp extends Component {
  state = {
    query: '', // Хранит запрос для поиска
    images: [], // Хранит загруженные изображения
    page: 1, // Хранит текущий номер страницы
    //error: null, // Хранит сообщение об ошибке
    loading: false, // Индикатор загрузки изображений
    // totalPages: 0, // Хранит общее количество страниц
  };

  //*** */
  // Метод жизненного цикла: вызывается при обновлении компонента
  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    // Проверяем, изменился ли запрос или номер страницы
    if (prevState.query !== query || prevState.page !== page) {
      // this.addImages(); // Получаем и добавляем изображения в состояние
      this.setState({ loading: true });
      const { hits } = await getImages(query, page);

      this.setState({ loading: false });
      if (hits.length === 0) {
        toast.error('Nothing was found for your query');
        return;
      }
      const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      }));

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
    }
  }

  // Метод для обработки отправки формы поиска

  handleSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.elements.query.value;
    query.trim() === ' '
      ? toast.error('Упс... Введите запрос!')
      : this.changeQuery(query);

    evt.target.reset();
  };

  changeQuery = newQuery => {
    if (newQuery !== this.state.query) {
      this.setState({
        query: newQuery,
        images: [],
        page: 1,
      });
    }
  };

  // Метод для загрузки дополнительных изображений путем увеличения номера текущей страницы
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
            Image gallery is empty...
          </p>
        )}
        {loading && <Loader />}
        {images.length >= 12 && !loading && (
          <Button onClick={this.handleLoadMore} /> // Кнопка для загрузки дополнительных изображений
        )}
        <ToastContainer />
      </div>
    );
  }
}
