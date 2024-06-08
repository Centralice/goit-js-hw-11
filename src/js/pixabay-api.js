import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkup } from '/js/render-functions';

const loader = document.querySelector('.loader');

export function getImages(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '44273329-392765d5a069e216bf7d20a4c',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}?${params}`;

  loader.classList.add('is-on');

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.hits.length) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query',
          messageColor: '#ffffff',
          backgroundColor: '#0077b6',
          position: 'topRight',
          timeout: 5000,
        });
      } else {
        const container = document.querySelector('.container');
        createMarkup(data.hits);
        container.insertAdjacentHTML('beforeend', createMarkup(data.hits));

        const lightbox = new SimpleLightbox('.container a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
        lightbox.refresh();
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loader.classList.remove('is-on');
    });
}
