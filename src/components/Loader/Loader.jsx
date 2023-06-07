import React from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <ClipLoader size={250} color={'#461646'} className={styles.loader} />
    </div>
  );
};

export default Loader;
