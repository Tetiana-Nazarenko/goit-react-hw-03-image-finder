import { Component } from 'react';

import { getImages } from '../service/API';
//import * as API from '../service/API';
// import { Grid } from 'react-loader-spinner';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { nanoid } from 'nanoid';

//import PostsApiService from 'service/API';
// const API_KEY = '38081191-44fc2de709a1cfc57ee790b0d';
// const URl = 'https://pixabay.com/api/';

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

  // Метод для получения и добавления изображений в состояние
  // addImages = async () => {
  //   const { searchName, currentPage } = this.state;
  //   try {
  //     this.setState({ isLoading: true }); // Устанавливаем флаг загрузки

  //     // Получаем данные с помощью API запроса к Pixabay
  //     const data = await API.getImages(searchName, currentPage);

  //     if (data.hits.length === 0) {
  //       // Если изображения не найдены, выводим сообщение
  //       return toast.info('Sorry image not found...', {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }

  //     // Нормализуем полученные изображения
  //     const normalizedImages = API.normalizedImages(data.hits);

  //     this.setState(state => ({
  //       images: [...state.images, ...normalizedImages], // Добавляем новые изображения к существующим
  //       isLoading: false, // Сбрасываем флаг загрузки
  //       error: '', // Очищаем сообщение об ошибке
  //       totalPages: Math.ceil(data.totalHits / 12), // Вычисляем общее количество страниц
  //     }));
  //   } catch (error) {
  //     this.setState({ error: 'Something went wrong!' }); // Если произошла ошибка, выводим сообщение
  //   } finally {
  //     this.setState({ isLoading: false }); // В любом случае сбрасываем флаг загрузки
  //   }
  // };

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
            Image gallery is empty... 📷
          </p>
        )}
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore} /> // Кнопка для загрузки дополнительных изображений
        )}
        <ToastContainer />
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
//export default ImageApp;
