// import React, { useState, useEffect, useCallback } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Button from '../Button/Button';
// import Searchform from '../Searchform/Searchform';
// import ImageGallery from '../ImageGallery/ImageGallery';
// import Loader from '../Loader/Loader';

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

// export default PixabayApi;
