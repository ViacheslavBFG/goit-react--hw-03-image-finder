import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './searchBar.module.css';

class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  handleFormInput = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  };

  resetForm = () => {
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchform} onSubmit={this.handleFormSubmit}>
          <button type="button" className={css.searchform_button} onClick={this.handleFormSubmit} aria-label="Search">
            <span className="button-label">Search</span>
          </button>

          <input
            className={css.searchform_input}
            value={this.state.inputValue}
            onChange={this.handleFormInput}
            type="text"
            autoComplete="off"
            name="query"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
