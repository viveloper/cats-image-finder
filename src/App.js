import KeywordComponent from './Keyword.js';
import KeywordsComponent from './Keywords.js';
import SearchResultComponent from './SearchResult.js';
import { fetchKeywords, fetchResults } from './api.js';

class App {
  constructor() {
    this.Keyword = new KeywordComponent({
      onValueChange: this.handleKeywordChange.bind(this),
      onEnterKeyup: this.search.bind(this),
    });
    this.Keywords = new KeywordsComponent();
    this.SearchResult = new SearchResultComponent();
  }
  async handleKeywordChange(value) {
    if (!value) {
      this.Keywords.keywords = [];
      return;
    }
    const keywords = await fetchKeywords(value);
    this.Keywords.keywords = keywords;
  }
  async search(value) {
    if (!value) return;
    this.Keywords.keywords = [];
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
