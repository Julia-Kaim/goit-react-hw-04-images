import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImgURL, id }) => {
  return (
    <li className={styles.galleryItem}>
      <img src={smallImgURL} alt={id} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
