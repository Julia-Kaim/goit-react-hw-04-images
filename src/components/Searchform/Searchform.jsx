import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import styles from './Searchform.module.css';

const Searchform = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter your search query');
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchform} onSubmit={handleSubmit}>
        <input
          onInput={handleInputChange}
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
        />
        <button type="submit" className={styles.searchFormButton}>
          search
        </button>
      </form>
    </header>
  );
};

Searchform.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchform;
