import KeywordComponent from './Keyword.js';
import KeywordsComponent from './Keywords.js';
import SearchResultComponent from './SearchResult.js';
import { fetchKeywords, fetchResults } from './api.js';

class App {
  constructor() {
    this.el = document.querySelector('.app');
    this.Keyword = new KeywordComponent({
      onValueChange: this.handleKeywordChange.bind(this),
      onEnterKeyup: this.handleEnterKeyup.bind(this),
      onEscapeKeyup: this.clearKeywords.bind(this),
      onArrowUpKeyup: this.decreaseActiveKeywordIdx.bind(this),
      onArrowDownKeyup: this.increaseActiveKeywordIdx.bind(this),
    });
    this.Keywords = new KeywordsComponent({
      onKeywordClick: this.handleKeywordClick.bind(this),
    });
    this.SearchResult = new SearchResultComponent();
    this.bindEvents();
  }
  bindEvents() {
    this.el = addEventListener('click', this.handleClick.bind(this));
  }
  handleClick(e) {
    if (e.target.tagName !== 'LI') this.clearKeywords();
  }
  async handleKeywordChange(value) {
    if (!value) {
      this.clearKeywords();
      return;
    }
    const keywords = await fetchKeywords(value);
    this.Keywords.keywords = keywords;
  }
  increaseActiveKeywordIdx() {
    const currentKeywordIdx = this.Keywords.activeKeywordIdx;
    const keywordsLength = this.Keywords.keywords.length;
    if (currentKeywordIdx >= keywordsLength - 1) return;
    this.Keywords.activeKeywordIdx = currentKeywordIdx + 1;
  }
  decreaseActiveKeywordIdx() {
    const currentKeywordIdx = this.Keywords.activeKeywordIdx;
    if (currentKeywordIdx < 0) return;
    this.Keywords.activeKeywordIdx = currentKeywordIdx - 1;
  }
  handleKeywordClick(keyword) {
    this.search(keyword);
  }
  handleEnterKeyup(value) {
    const currentKeywordIdx = this.Keywords.activeKeywordIdx;
    if (currentKeywordIdx >= 0) {
      this.search(this.Keywords.keywords[currentKeywordIdx]);
      return;
    }
    this.search(value);
  }
  clearKeywords() {
    this.Keywords.keywords = [];
    this.Keywords.activeKeywordIdx = -1;
  }
  async search(value) {
    if (!value) return;
    this.Keyword.value = value;
    this.clearKeywords();
    this.SearchResult.loading = true;
    try {
      const result = await fetchResults(value);
      this.SearchResult.result = result;
    } catch (err) {
      this.SearchResult.error = err;
    }
  }
}

export default App;
