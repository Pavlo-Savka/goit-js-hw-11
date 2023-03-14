import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

async function fetchpixabay(request, page) {
  const KEY = '34328101-794589af804430f41127b6154';
  const URL = `https://pixabay.com/api/`;
  const options = {
    params: {
      key: `${KEY}`,
      q: `=${request}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: page,
    },
  };
  
  try {
    const response = await axios.get(URL, options);
    return response.data;
  } catch (error) {

    Notify.failure('Error, this addres in not exist');
  }
}

export default { fetchpixabay };