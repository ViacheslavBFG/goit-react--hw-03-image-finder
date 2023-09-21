import { Component } from 'react';
import Notiflix from 'notiflix';
import API from './API/PixabayService'

import ImageGallery from './Modules/ImageGallery/ImageGallery';
import SearchBar from './Modules/Searchbar/Searchbar';
import Button from './Modules/Button/Button';
import { Loader } from './Modules/Loader/Loader';
import Modal from './Modules/Modal/Modal';


class App extends Component {
  state = {
    modal: { isOpen: false, largeImageURL: '' },
    images: [],
    totalImages: 0,
    searchQuery: '',
    currentPage: 1,
    loading: false,
    error: false,
  };

  componentDidUpdate = async (_, prevState) => {
    const { searchQuery, currentPage } = this.state;
    if (
      searchQuery !== prevState.searchQuery ||
      currentPage !== prevState.currentPage
    ) {
      this.fetchImages(searchQuery, currentPage);
    }
  };

  
  onSubmitSearch = query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
    });
    this.fetchImages(query, 1);
   
  };

  onPageUpload = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
    this.fetchImages(this.state.searchQuery, this.state.currentPage + 1);
  };

  fetchImages = async (query, page) => {
    try {
      this.setState({ loading: true });

      const data = await API(query, page);

      if (data.totalHits === 0) {
        Notiflix.Notify.warning(
          `There is no results upon your ${query}, please try again...`
        );
        return;
      }

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...data.hits],
          totalImages: data.totalHits,
        };
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  //work with modal
  onModalOpen = data => {
    this.setState({
      modal: {
        isOpen: true,
        largeImageURL: data,
      },
    });
  };

  onModalClose = () => {
    this.setState({
      modal: {
        isOpen: false,
        largeImageURL: '',
      },
    });
  };

  render() {
    const { images, loading,totalImages, modal } = this.state;
    const showBtn = !loading && images.length !== totalImages;

    return (
      <div>
        <SearchBar onSubmit={this.onSubmitSearch} />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} onModalOpen={this.onModalOpen} />
        )}
        

        {showBtn && <Button onPageUpload={this.onPageUpload} />}

        {modal.isOpen && (
          <Modal
            largeImageURL={this.state.modal.largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}

export default App;
