import React, { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';

const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [bigPic, setBigPic] = useState(null);

  const handleClick = useCallback(
    e => {
      if (e.target.nodeName !== 'IMG') {
        setShowModal(false);
      } else {
        const picture = images.find(obj => obj.id === parseInt(e.target.alt));
        setBigPic(picture.largeImageURL);
      }
    },
    [images]
  );

  const toggleModal = () => {
    setShowModal(prevState => !prevState.showModal);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return (
    <>
      <ul className={styles.gallery} onClick={toggleModal}>
        {images.map(img => (
          <ImageGalleryItem
            key={nanoid()}
            smallImgURL={img.webformatURL}
            id={img.id}
          />
        ))}
      </ul>
      {showModal && bigPic && <Modal onClose={toggleModal} pic={bigPic} />}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
