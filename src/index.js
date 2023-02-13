
import SearchApiService from "./api.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import LoadMoreBTN from './search-btn';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createMarkup } from './gallery';

const refs = {
  searchForm: document.querySelector('#search-form'),
  buttonSearch: document.querySelector('.button-search'),
  galleryList: document.querySelector('.gallery'),
};

const loadMoreBTN = new LoadMoreBTN({
  selector: '.load-more',
  hidden: true,
});

const searchApiService = new SearchApiService();

refs.searchForm.addEventListener('submit', onFormSubmit);
loadMoreBTN.refs.button.addEventListener('click', onLoadMoreBtn);


async function onFormSubmit(e) {
  e.preventDefault();

  loadMoreBTN.hide();
  
  searchApiService.query = e.target.elements.searchQuery.value.trim();
  

if (!searchApiService.query) {
    return;
  }
  // скидання сторінки
  searchApiService.resetPage();
  // очистка розмітки
  clearGalleryRef();

  await fetchPictures();
}

async function onLoadMoreBtn() {
  await fetchPictures();
}

async function fetchPictures() {
  await searchApiService
    .fetchSearchPictures()
    .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      appendPictureMarkup(data.hits);
      searchApiService.incrementPage();
      lightbox.refresh();
      loadMoreBTN.show();
    })
    .then(data => {
      const totalPage = data.totalHits / this.per_page;
      if (this.page >= totalPage) {
        loadMoreBTN.hide();
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
    })
    .catch(error => {
      return error;
    });
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function appendPictureMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', createMarkup(hits));
}

function clearGalleryRef() {
  refs.galleryList.innerHTML = '';
}

