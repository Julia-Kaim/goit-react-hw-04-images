import React from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PixabayApi from './Api/PixabayApi';

const App = () => {
  return (
    <>
      <PixabayApi />
    </>
  );
};

export default App;
