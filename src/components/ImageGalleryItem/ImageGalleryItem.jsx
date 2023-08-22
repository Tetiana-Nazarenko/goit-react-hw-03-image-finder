import { Component } from 'react';
import { Item, Img } from './ImageGalleryItem.styled';
import { ModalImage } from 'components/Modal/Modal';

// Классовый компонент ImageItem
export class ImageItem extends Component {
  state = {
    isOpen: false, // Хранит состояние модального окна (открыто или закрыто)
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };
  closeModal = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const { image } = this.props;

    return (
      <>
        <Item>
          <Img
            src={image.webformatURL} // URL маленького изображения
            alt={image.tags} // Теги изображения
            onClick={this.openModal} // Обработчик клика для открытия модального окна
          />
          {/* {showModal && ( // Если showModal равно true, отображаем модальное окно */}
          <ModalImage onOpen={this.state.isOpen} onClose={this.closeModal}>
            <img src={image.largeImageURL} alt={image.tags} />
          </ModalImage>
          {/* )} */}
        </Item>
      </>
    );
  }
}
