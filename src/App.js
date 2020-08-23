import Keyword from './Keyword.js';
import Keywords from './Keywords.js';
import SearchResults from './SearchResults.js';
import { fetchKeywords, fetchResults } from './api.js';

class App {
  constructor() {
    this.el = document.querySelector('.app');

    this.KeywordComponent = new Keyword({
      onKeywordChange: this.handleKeywordChange.bind(this),
      onKeywordsClear: this.clearKeywords.bind(this),
      onArrowDown: this.handleArrowDown.bind(this),
      onArrowUp: this.handleArrowUp.bind(this),
      onEnterKeyup: this.handleEnterKeyup.bind(this),
    });
    this.KeywordsComponent = new Keywords({
      onKeywordClick: this.handleKeywordClick.bind(this),
    });
    this.SearchResultsComponent = new SearchResults();

    this.el.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    if (
      e.target.className !== 'keyword' &&
      e.target.className !== 'keyword-item'
    ) {
      this.clearKeywords();
    }
  }

  handleArrowDown() {
    if (!this.KeywordsComponent.state.keywords.data) {
      this.handleKeywordChange(this.KeywordComponent.state.keyword);
      return;
    }
    this.KeywordsComponent.incrementKeywordIndex();
    this.KeywordsComponent.render();
  }

  handleArrowUp() {
    this.KeywordsComponent.decrementKeywordIndex();
    this.KeywordsComponent.render();
  }

  handleEnterKeyup(keyword) {
    const keywordIndex = this.KeywordsComponent.state.keywordIndex;
    const keywords = this.KeywordsComponent.state.keywords.data;
    if (keywordIndex >= 0) {
      keyword = keywords[keywordIndex];
    }
    this.searchResults(keyword);
    this.clearKeywords();
    this.KeywordComponent.setKeyword(keyword);
    this.KeywordComponent.render();
  }

  handleKeywordClick(keyword) {
    this.searchResults(keyword);
    this.clearKeywords();
    this.KeywordComponent.setKeyword(keyword);
    this.KeywordComponent.render();
  }

  clearKeywords() {
    this.KeywordsComponent.setKeywords({
      loading: false,
      data: null,
      error: null,
    });
    this.KeywordsComponent.setKeywordIndex(-1);
    this.KeywordsComponent.render();
  }

  handleKeywordChange(keyword) {
    if (keyword === '') {
      this.clearKeywords();
      return;
    }

    this.searchKeywords(keyword);
  }

  async searchKeywords(keyword) {
    this.KeywordsComponent.setKeywords({
      loading: true,
      data: null,
      error: null,
    });
    this.KeywordsComponent.render();

    try {
      const keywords = await fetchKeywords(keyword);
      this.KeywordsComponent.setKeywords({
        loading: false,
        data: keywords,
        error: null,
      });
      this.KeywordsComponent.setKeywordIndex(-1);
      this.KeywordsComponent.render();
    } catch (error) {
      this.KeywordsComponent.setKeywords({
        loading: false,
        data: null,
        error: error.message,
      });
      this.KeywordsComponent.setKeywordIndex(-1);
      this.KeywordsComponent.render();
    }
  }

  async searchResults(keyword) {
    if (!keyword) return;
    this.SearchResultsComponent.setSearchResults({
      loading: true,
      data: null,
      error: null,
    });
    this.SearchResultsComponent.render();

    try {
      const data = await fetchResults(keyword);
      this.SearchResultsComponent.setSearchResults({
        loading: false,
        data,
        error: null,
      });
      this.SearchResultsComponent.render();
    } catch (error) {
      this.SearchResultsComponent.setSearchResults({
        loading: false,
        data: null,
        error: error.message,
      });
      this.SearchResultsComponent.render();
    }
  }
}

export default App;
