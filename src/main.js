import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const query = form.elements['search-text'].value.trim();

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(({ data }) => {
      hideLoader();

      if (data.hits.length === 0) {
        iziToast.show({
          icon: 'ico-error',
          iconColor: '#fff',
          title: 'Error',
          titleColor: '#fff',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fff',
          backgroundColor: '#ef4040',
          position: 'topRight',
          timeout: 5000,
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(err => {
      hideLoader();
      iziToast.show({
        icon: 'ico-error',
        iconColor: '#fff',
        title: 'Error',
        titleColor: '#fff',
        message: err.message,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 5000,
      });
    });
});
