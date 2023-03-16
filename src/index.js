import PICTURE from './fetchpixabay';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const galleryCard = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const searchForm = document.querySelector('.search-form');
let page = 1;
let total = 0;

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImg);
loadMoreBtn.addEventListener('click', scroll);

function handleSubmit(event) {
  event.preventDefault();
  if (!searchForm.searchQuery.value) {
    return;
  } else {
    galleryCard.innerHTML = '';
    page = 1;
    PICTURE.fetchpixabay(searchForm.searchQuery.value, page).then(
      renderGallery
    );
  }
}

function renderCard(data) {
  if (page === 1) {
    Notify.success(`Hooray! We found ${data.totalHits} image`);
  }
  const markup = data.hits
    .map(element => {
      return `
      <div class="photo-card">
      <a href = "${element.largeImageURL}" target="_blank">     
      <div class = "photo-card-wrapper">
      <img class="photo-card-img" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
      </div>
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${element.likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${element.views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${element.comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${element.downloads}</span>
        </p>
      </div>
    </div>
         `;
    })
    .join('');
  galleryCard.insertAdjacentHTML('beforeend', markup);
  total = data.totalHits;
  noMoreImg(total);
  return total;
}

function renderGallery(data) {
  if (data.hits.length === 0) {
    loadMoreBtn.style.display = 'none';
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    renderCard(data);
  }
}

function loadMoreImg() {
  page += 1;
  PICTURE.fetchpixabay(searchForm.searchQuery.value, page).then(renderGallery);
}

function noMoreImg() {
  if (page * 40 < total) {
    loadMoreBtn.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'none';
    if (page > 1) {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  }
};
 
  function scroll() {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    setTimeout(() => {
      window.scrollBy({
        top: cardHeight * 3 - 20,
        behavior: 'smooth',
      });
    }, 500); 
}