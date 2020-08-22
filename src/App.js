import Keyword from './Keyword.js';
import Keywords from './Keywords.js';
import SearchResults from './SearchResults.js';
import { fetchKeywords, fetchResults } from './api.js';

class App {
  #el;
  #state;
  #KeywordComponent;
  #KeywordsComponent;

  constructor() {
    this.#el = document.querySelector('.app');

    this.#state = {
      keywords: [],
      keywordIndex: -1,
    };

    this.#KeywordComponent = new Keyword({
      onKeywordChange: this.#handleKeywordChange.bind(this),
    });
    this.#KeywordsComponent = new Keywords({
      onKeywordClick: this.#handleKeywordClick.bind(this),
    });

    this.#render();
  }

  #setState(state) {
    this.#state = state;
    this.#render();
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
      });
    } catch (error) {
      this.#setState({
        ...this.#state,
        keywords: [],
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
  }
}

export default App;
