import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ onPageUpload }) => (
    <div>
        <button type="button" className={css.load_btn} onClick={onPageUpload}>Load more</button>
    </div>
);

Button.propTypes = {
    onPageUpload: PropTypes.func.isRequired
};

export default Button;