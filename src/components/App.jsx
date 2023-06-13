// // import React from 'react';

// // import 'react-toastify/dist/ReactToastify.css';

// // import PixabayApi from './Api/PixabayApi';

// // const App = () => {
// //   return (
// //     <>
// //       <PixabayApi />
// //     </>
// //   );
// // };

// // export default App;


// import React, { useState, useEffect, useCallback } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Button from './Button/Button';
// import Searchform from './Searchform/Searchform';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Loader from './Loader/Loader';

// const ImageFetcher = ({ URL, API_KEY, query, page, handleLoadMore }) => {
//   const [pictures, setPictures] = useState([]);
//   const [status, setStatus] = useState('idle');
//   const [totalHits, setTotalHits] = useState(null);

//   const fetchImg = useCallback(async () => {
//     try {
//       const response = await fetch(
//         `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//       );

//       if (response.ok) {
//         const picturesData = await response.json();

//         if (!picturesData.total) {
//           toast.error('Did not find anything, mate');
//         }

//         const selectedProperties = picturesData.hits.map(
//           ({ id, largeImageURL, webformatURL }) => {
//             return { id, largeImageURL, webformatURL };
//           }
//         );

//         setPictures(prevPictures => [...prevPictures, ...selectedProperties]);
//         setTotalHits(picturesData.total);
//         setStatus('resolved');
//       } else {
//         throw new Error('Failed to find any images');
//       }
//     } catch (error) {
//       setStatus('rejected');
//     }
//   }, [URL, API_KEY, query, page]);

//   useEffect(() => {
//     if (query && page === 1) {
//       setPictures([]);
//       setStatus('pending');
//       fetchImg();
//     }
//   }, [query, page, fetchImg]);

//   return (
//     <>
//       {pictures.length > 0 && <ImageGallery images={pictures} />}
//       {totalHits > pictures.length && <Button onClick={handleLoadMore} />}
//       {status === 'pending' && <Loader />}
//     </>
//   );
// };

// const PixabayApi = () => {
//   const URL = 'https://pixabay.com/api/';
//   const API_KEY = '34856693-e3065cdefd04353a1725658fc';

//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState('');

//   const processSubmit = newQuery => {
//     setQuery(newQuery);
//     setPage(1);
//   };

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   return (
//     <>
//       <Searchform onSubmit={processSubmit} />
//       {query && (
//         <ImageFetcher
//           URL={URL}
//           API_KEY={API_KEY}
//           query={query}
//           page={page}
//           handleLoadMore={handleLoadMore}
//         />
//       )}
//       <ToastContainer autoClose={2000} />
//     </>
//   );
// };

// const App = () => {
//   return (
//     <>
//       <PixabayApi />
//     </>
//   );
// };

// export default App;



import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchform from './Searchform/Searchform';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';


const API_KEY = '25766392-01b12b6ed5ab34bc2910d9c3e';
const URL = 'https://pixabay.com/api/';

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');
    const fetchImg = () => {
      return fetch(
        `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('Failed to find any images'));
        })
        .then(pictures => {
          if (!pictures.total) {
            toast.error('Did find anything, mate');
          }
          return pictures;
        })
        .catch(error => setError(error) && setStatus('rejected'));
    };
    fetchImg().then(pictures => {
      const selectedProperties = pictures.hits.map(
        ({ id, largeImageURL, webformatURL }) => {
          return { id, largeImageURL, webformatURL };
        }
      );
      setPictures(prevState => [...prevState, ...selectedProperties]);
      setStatus('resolved');
      setTotalHits(pictures.total);
    });
  }, [page, query]);

  const processSubmit = query => {
    setQuery(query);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Searchform onSubmit={processSubmit} />
      {pictures.length && <ImageGallery images={pictures} />}
      {totalHits > pictures.length && <Button onClick={handleLoadMore} />}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && { error }}
      <ToastContainer autoClose={2000} />
    </>
  );
}