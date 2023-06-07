import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Button from './Button/Button';
// import Searchform from './Searchform/Searchform';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Loader from './Loader/Loader';
import PixabayApi from './Api/PixabayApi';



const App = () => {
  return (
    <>
      <PixabayApi />
    </>
  );
};

export default App;
