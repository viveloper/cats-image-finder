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
      keywordIndex: -1,
      searchResults: {
        loading: false,
        data: [],
        error: null,
      },
    };

    this.handleInputKeyup = this.handleInputKeyup.bind(this);
    this.search = this.search.bind(this);
    this.clearKeywords = this.clearKeywords.bind(this);
    this.handleKeywordClick = this.handleKeywordClick.bind(this);
    this.setKeyword = this.setKeyword.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.el.addEventListener('click', this.handleClick);
  }

  setState(state) {
    this.state = state;
    this.render();
  }

  async handleInputKeyup({ key, value }) {
    if (key === 'Escape') {
      this.clearKeywords();
    } else if (key === 'Enter') {
      const keywordIndex = this.state.keywordIndex;
      if (keywordIndex === -1) {
        this.search(value);
      } else {
        this.setKeyword(this.state.keywords[keywordIndex]);
        this.search(this.state.keywords[keywordIndex]);
      }
      this.clearKeywords();
    } else if (key === 'ArrowDown') {
      const nextIndex =
        this.state.keywordIndex + 1 < this.state.keywords.length
          ? this.state.keywordIndex + 1
          : this.state.keywordIndex;
      this.setState({
        ...this.state,
        keywordIndex: nextIndex,
      });
    } else if (key === 'ArrowUp') {
      const prevIndex =
        this.state.keywordIndex - 1 >= 0 ? this.state.keywordIndex - 1 : -1;
      this.setState({
        ...this.state,
        keywordIndex: prevIndex,
      });
    } else {
      if (this.state.keyword === value) return;
      this.setKeyword(value);
      if (value === '') {
        this.clearKeywords();
        return;
      }
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
      this.setState({
        ...this.state,
        searchResults: {
          loading: true,
          data: [],
          error: null,
        },
      });
      const searchResults = await fetchResults(value);
      this.setState({
        ...this.state,
        searchResults: {
          loading: false,
          data: searchResults,
          error: null,
        },
      });
    } catch (error) {
      this.setState({
        ...this.state,
        searchResults: {
          loading: false,
          data: [],
          error,
        },
      });
    }
  }

  clearKeywords() {
    this.setState({
      ...this.state,
      keywords: [],
      keywordIndex: -1,
    });
  }

  handleKeywordClick(keyword) {
    this.setKeyword(keyword);
    this.clearKeywords();
    this.search(keyword);
  }

  setKeyword(keyword) {
    this.setState({
      ...this.state,
      keyword,
    });
  }

  handleClick(e) {
    if (
      e.target.className !== 'keyword-item' &&
      e.target.className !== 'keyword'
    ) {
      this.clearKeywords();
    }
  }

  render() {
    this.clearComponents();

    this.keyword = new Keyword({
      keyword: this.state.keyword,
      onKeyup: this.handleInputKeyup,
      onKeywordsClear: this.clearKeywords,
    });

    this.keywords = new Keywords({
      keywords: this.state.keywords,
      keywordIndex: this.state.keywordIndex,
      onKeywordClick: this.handleKeywordClick,
    });

    this.searchResults = new SearchResults({
      loading: this.state.searchResults.loading,
      searchResults: this.state.searchResults.data,
      error: this.state.searchResults.error,
    });
  }

  clearComponents() {
    if (this.keyword) this.keyword.clear();
    if (this.keywords) this.keywords.clear();
    if (this.searchResults) this.searchResults.clear();
  }
}

export default App;
