import { List } from './ImageGallery.styled';

import { ImageItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <List>
      {images.map(image => (
        <ImageItem key={image.id} image={image} />
      ))}
    </List>
  );
};
