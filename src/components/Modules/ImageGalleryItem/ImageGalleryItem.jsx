import React from 'react';
import PropTypes from 'prop-types';
import css from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ item, onModalOpen }) => {
  return (
    <li className={css.gallery_item}>
      <img
        className={css.gallery_image}
        src={item.webformatURL}
        alt={item.tags}
        onClick={() => onModalOpen(item.largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  item: {
    webformatURL: '',
    tags: '',
    largeImageURL: '',
  },
  onModalOpen: () => {},
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
