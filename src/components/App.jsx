import { Component } from 'react';

import * as API from '../service/API';
// import { Grid } from 'react-loader-spinner';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { nanoid } from 'nanoid';

//import PostsApiService from 'service/API';
// const API_KEY = '38081191-44fc2de709a1cfc57ee790b0d';
// const URl = 'https://pixabay.com/api/';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

class ImageApp extends Component {
  state = {
    searchName: '', // Хранит запрос для поиска
    images: [], // Хранит загруженные изображения
    currentPage: 1, // Хранит текущий номер страницы
    error: null, // Хранит сообщение об ошибке
    isLoading: false, // Индикатор загрузки изображений
    totalPages: 0, // Хранит общее количество страниц
  };

  //*** */
  // Метод жизненного цикла: вызывается при обновлении компонента
  componentDidUpdate(_, prevState) {
    // Проверяем, изменился ли запрос или номер страницы
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages(); // Получаем и добавляем изображения в состояние
    }
  }

  // Метод для загрузки дополнительных изображений путем увеличения номера текущей страницы
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  // Метод для обработки отправки формы поиска
  handleSubmit = query => {
    this.setState({
      searchName: query, // Устанавливаем введенный запрос в состояние
      images: [], // Очищаем массив с изображениями
      currentPage: 1, // Сбрасываем номер текущей страницы на первую
    });
  };

  // Метод для получения и добавления изображений в состояние
  addImages = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true }); // Устанавливаем флаг загрузки

      // Получаем данные с помощью API запроса к Pixabay
      const data = await API.getImages(searchName, currentPage);

      if (data.hits.length === 0) {
        // Если изображения не найдены, выводим сообщение
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      // Нормализуем полученные изображения
      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages], // Добавляем новые изображения к существующим
        isLoading: false, // Сбрасываем флаг загрузки
        error: '', // Очищаем сообщение об ошибке
        totalPages: Math.ceil(data.totalHits / 12), // Вычисляем общее количество страниц
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' }); // Если произошла ошибка, выводим сообщение
    } finally {
      this.setState({ isLoading: false }); // В любом случае сбрасываем флаг загрузки
    }
  };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;

    return (
      <div>
        <ToastContainer />
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && isLoading && (
          <Button onClick={this.loadMore} /> // Кнопка для загрузки дополнительных изображений
        )}

        {/* <header> */}
        {/* <form onSubmit={this.submitQuery}> */}
        {/* <form onSubmit={this.handleSubmit}>
            <button type="submit">
              <span>Search</span>
            </button>

            <input
              name="searchName"
              type="text"
              placeholder="Search images and photos"
              id="search"
              value={this.state.inputValue}
              onChange={this.handleChange}
            />
          </form>
        </header> */}
        {/* {error && <h2>Please, enter search word!</h2>} */}
        {/* <div>
          {isLoading && (
            <Grid
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </div> */}
        {/* <ImageGallery /> */}
        {/* {images.length > 0 ? ( */}
        {/* // <ul>
          //   {images.map(image => ( */}
        {/* //     <li key={image.id}>
          //       <img src={image.webformatURL} alt="" width="300" />
          //     </li>
          //   ))}
          // </ul> */}
        {/* // ) : (
        //   <p */}
        {/* //     style={{
        //       padding: 100,
        //       textAlign: 'center',
        //       fontSize: 30,
        //     }}
        //   >
        //     Image gallery is empty... 📷
        //   </p>
        // )} */}
        {/* <div>
          {images.length > 0 && totalPages !== currentPage && !isLoading && (
            <button onClick={this.loadMore}>Load more</button>
          )}
        </div> */}
        {/* {this.state.showModal && (
          <div onClick={this.handleBankdropClick}>
            <div onClick={this.openModal}>
              <img src={this.state.images.largeImageURL} alt="" />
            </div>
          </div>
        )} */}
      </div>
    );
  }
}
export default ImageApp;
