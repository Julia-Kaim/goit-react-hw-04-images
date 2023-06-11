import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ onClose, pic }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img src={pic} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  pic: PropTypes.string.isRequired,
};

export default Modal;
