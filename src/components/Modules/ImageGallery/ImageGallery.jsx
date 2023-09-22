import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/imageGallery.module.css';

const ImageGallery = ({ images, onModalOpen }) => {
  return (
    <ul className={css.gallery}>
      {images.length > 0 &&
        images.map(image => (
          <ImageGalleryItem
            key={image.id}
            item={image}
            onModalOpen={onModalOpen}
          />
        ))}
    </ul>
  );
};

ImageGallery.defaultProps = {
  onModalOpen: () => {},
  images: [],
};

ImageGallery.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;