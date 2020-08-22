import Keyword from './Keyword.js';
import Keywords from './Keywords.js';
import SearchResults from './SearchResults.js';
import { fetchKeywords, fetchResults } from './api.js';

class App {
  constructor() {
    this.el = document.querySelector('.app');

    this.state = {
      keyword: '',
      keywords: [],
      searchResults: [],
    };

    this.handleInputKeyup = this.handleInputKeyup.bind(this);
    this.search = this.search.bind(this);
    this.clearKeywords = this.clearKeywords.bind(this);
    this.handleKeywordClick = this.handleKeywordClick.bind(this);
  }

  setState(state) {
    this.state = state;
    this.render();
  }

  async handleInputKeyup({ key, value }) {
    if (key === 'Escape') {
      this.clearKeywords();
    } else if (key === 'Enter') {
      this.search(value);
      return;
    } else {
      this.setState({
        ...this.state,
        keyword: value,
      });

      try {
        const keywords = await fetchKeywords(value);
        this.setState({
          ...this.state,
          keywords,
        });
      } catch (error) {
        this.setState({
          ...this.state,
          keywords: [],
        });
      }
    }
  }

  async search(value) {
    try {
      const searchResults = await fetchResults(value);
      this.setState({
        ...this.state,
        searchResults,
      });
    } catch (error) {
      this.setState({
        ...this.state,
        searchResults: [],
      });
    }
  }

  clearKeywords() {
    this.setState({
      ...this.state,
      keywords: [],
    });
  }

  handleKeywordClick(keyword) {
    this.setState({
      ...this.state,
      keyword,
    });
    this.clearKeywords();
    this.search(keyword);
  }

  render() {
    console.log('render app');

    this.clearComponents();

    this.keyword = new Keyword({
      keyword: this.state.keyword,
      onKeyup: this.handleInputKeyup,
      onSearch: this.handleSearch,
      onKeywordsClear: this.clearKeywords,
    });

    this.keywords = new Keywords({
      keywords: this.state.keywords,
      onKeywordClick: this.handleKeywordClick,
    });

    this.searchResults = new SearchResults({
      searchResults: this.state.searchResults,
    });
  }

  clearComponents() {
    if (this.keyword) this.keyword.clear();
    if (this.keywords) this.keywords.clear();
    if (this.searchResults) this.searchResults.clear();
  }
}

export default App;
