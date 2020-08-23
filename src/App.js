import Keyword from './Keyword.js';
import Keywords from './Keywords.js';
import SearchResults from './SearchResults.js';
import { fetchKeywords, fetchResults } from './api.js';

class App {
  #el;
  #state;
  #KeywordComponent;
  #KeywordsComponent;
  #SearchResultsComponent;

  constructor() {
    this.#el = document.querySelector('.app');

    this.#state = {
      keywords: [],
      keywordIndex: -1,
      searchResults: {
        loading: false,
        data: null,
        error: null,
      },
    };

    this.#KeywordComponent = new Keyword({
      onKeywordChange: this.#handleKeywordChange.bind(this),
      onKeywordsClear: this.#clearKeywords.bind(this),
      onArrowDown: this.#handleArrowDown.bind(this),
      onArrowUp: this.#handleArrowUp.bind(this),
      onSearch: this.#search.bind(this),
    });
    this.#KeywordsComponent = new Keywords({
      onKeywordClick: this.#handleKeywordClick.bind(this),
    });
    this.#SearchResultsComponent = new SearchResults();

    this.#render();
  }

  #setState(state) {
    this.#state = state;
    this.#render();
  }

  #handleArrowDown() {
    const nextIndex =
      this.#state.keywordIndex + 1 < this.#state.keywords.length
        ? this.#state.keywordIndex + 1
        : this.#state.keywordIndex;
    this.#setState({
      ...this.#state,
      keywordIndex: nextIndex,
    });
  }

  #handleArrowUp() {
    const prevIndex =
      this.#state.keywordIndex - 1 >= 0 ? this.#state.keywordIndex - 1 : -1;
    this.#setState({
      ...this.#state,
      keywordIndex: prevIndex,
    });
  }

  async #search(keyword) {
    if (this.#state.keywordIndex >= 0) {
      keyword = this.#state.keywords[this.#state.keywordIndex];
    }

    this.#setState({
      ...this.#state,
      searchResults: {
        loading: true,
        data: [],
        error: null,
      },
    });

    try {
      const data = await fetchResults(keyword);
      this.#setState({
        ...this.#state,
        searchResults: {
          loading: false,
          data,
          error: null,
        },
      });
    } catch (error) {
      this.#setState({
        ...this.#state,
        searchResults: {
          loading: false,
          data: null,
          error,
        },
      });
    }
  }

  async #handleKeywordChange(keyword) {
    if (keyword === '') {
      this.#clearKeywords();
      return;
    }
    try {
      const keywords = await fetchKeywords(keyword);
      this.#setState({
        ...this.#state,
        keywords,
        keywordIndex: -1,
      });
    } catch (error) {
      this.#setState({
        ...this.#state,
        keywords: [],
        keywordIndex: -1,
      });
    }
  }

  async #handleKeywordClick(keyword) {
    console.log(keyword);
  }

  #clearKeywords() {
    this.#setState({
      ...this.#state,
      keywords: [],
      keywordIndex: -1,
    });
  }

  #render() {
    console.log('render App');
    this.#KeywordsComponent.setKeywords(this.#state.keywords);
    this.#KeywordsComponent.setKeywordIndex(this.#state.keywordIndex);
    this.#SearchResultsComponent.setSearchResults(this.#state.searchResults);
  }
}

export default App;
