import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../ImageGallery/imageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';

class ImageGallery extends Component {
  state = {
    allImagesLoaded: false,
    loading: false,
  };


  isFetching = false;

  handleLoadMoreClick = () => {
    if (!this.isFetching && !this.state.allImagesLoaded) {
      this.isFetching = true;

      this.setState({ loading: true }, () => {
        this.props.onPageUpload().finally(() => {
          this.setState({ loading: false });
          this.isFetching = false;
        });
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.images.length !== this.props.images.length) {
      this.checkAllImagesLoaded();
    }
  }

  checkAllImagesLoaded = () => {
    const { images, totalImages } = this.props;
    const allImagesLoaded = images.length >= totalImages;

    this.setState({ allImagesLoaded });
  };

  render() {
    const { images, onModalOpen } = this.props;
    const { allImagesLoaded, loading } = this.state;

    return (
      <div>
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

        {!allImagesLoaded && images.length > 0 && !loading && (
          <Button onPageUpload={this.handleLoadMoreClick} />
        )}
      </div>
    );
  }
}

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
  totalImages: PropTypes.number.isRequired,
  onPageUpload: PropTypes.func.isRequired,
};

export default ImageGallery;
