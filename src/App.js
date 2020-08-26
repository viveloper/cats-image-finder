import Component from './Component.js';
import KeywordComponent from './Keyword.js';
import KeywordsComponent from './Keywords.js';
import SearchResultsComponent from './SearchResults.js';
import { fetchKeywords, fetchResults } from './api.js';

class App extends Component {
  constructor() {
    const el = document.querySelector('.app');
    super(el);

    this.Keyword = new KeywordComponent();
    this.Keywords = new KeywordsComponent();
    this.SearchResults = new SearchResultsComponent();

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.on('click', this.handleClick.bind(this));

    this.Keyword.on('@keywordClear', this.clearKeywords.bind(this));
    this.Keyword.on('@enterKeyup', this.handleEnterKeyup.bind(this));
    this.Keyword.on('@arrowDown', this.handleArrowDown.bind(this));
    this.Keyword.on('@arrowUp', this.handleArrowUp.bind(this));
    this.Keyword.on('@keywordChange', this.handleKeywordChange.bind(this));

    this.Keywords.on('@keywordClick', this.handleKeywordClick.bind(this));
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
    if (!this.Keywords.state.keywords.data) {
      this.searchKeywords(this.Keyword.state.keyword);
      return;
    }
    this.Keywords.incrementKeywordIndex();
    this.Keywords.render();
  }

  handleArrowUp() {
    this.Keywords.decrementKeywordIndex();
    this.Keywords.render();
  }

  handleEnterKeyup(e) {
    let keyword = e.detail;
    const keywordIndex = this.Keywords.state.keywordIndex;
    const keywords = this.Keywords.state.keywords.data;
    if (keywordIndex >= 0) {
      keyword = keywords[keywordIndex];
    }
    this.searchResults(keyword);
    this.clearKeywords();
    this.Keyword.setKeyword(keyword);
    this.Keyword.render();
  }

  handleKeywordClick(e) {
    const keyword = e.detail;
    this.searchResults(keyword);
    this.clearKeywords();
    this.Keyword.setKeyword(keyword);
    this.Keyword.render();
  }

  clearKeywords() {
    this.Keywords.setKeywords({
      loading: false,
      data: null,
      error: null,
    });
    this.Keywords.setKeywordIndex(-1);
    this.Keywords.render();
  }

  handleKeywordChange(e) {
    const keyword = e.detail;
    if (keyword === '') {
      this.clearKeywords();
      return;
    }

    this.searchKeywords(keyword);
  }

  async searchKeywords(keyword) {
    if (keyword === '') return;
    this.Keywords.setKeywords({
      loading: true,
      data: null,
      error: null,
    });
    this.Keywords.render();

    try {
      const keywords = await fetchKeywords(keyword);
      this.Keywords.setKeywords({
        loading: false,
        data: keywords,
        error: null,
      });
      this.Keywords.setKeywordIndex(-1);
      this.Keywords.render();
    } catch (error) {
      this.Keywords.setKeywords({
        loading: false,
        data: null,
        error: error.message,
      });
      this.Keywords.setKeywordIndex(-1);
      this.Keywords.render();
    }
  }

  async searchResults(keyword) {
    if (!keyword) return;
    this.SearchResults.setSearchResults({
      loading: true,
      data: null,
      error: null,
    });
    this.SearchResults.render();

    try {
      const data = await fetchResults(keyword);
      this.SearchResults.setSearchResults({
        loading: false,
        data,
        error: null,
      });
      this.SearchResults.render();
    } catch (error) {
      this.SearchResults.setSearchResults({
        loading: false,
        data: null,
        error: error.message,
      });
      this.SearchResults.render();
    }
  }

  render() {}
}

export default App;
