import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "10499035-4c19632db287de98b060ef18d";

export default class SearchApiService {
  constructor() {
    this.searchQuery = '';
    // значення page зберігаємо як ключ об'єкта
    this.page = 1;
    this.per_page = 40;
  }

    async fetchSearchPictures() {
    console.log(this);

      const res = await axios.get
        (`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`
    );
  
    const data = res.data;
    console.log(data);
    if (res.status !== 200) {
      throw new Error(res.status);
    }

    return data;
  }
// метод збільшення на 1
  incrementPage() {
    this.page += 1;
  }
  // метод, який скидає сторінку на 1-шу сторінку
  resetPage() {
    this.page = 1;
  }
  // get & set контролює термін запиту
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}