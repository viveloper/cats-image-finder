class SearchResults {
  #el;
  #state;
  #props;

  constructor(props) {
    this.#el = document.querySelector('.search-results');
    this.#props = props;
    this.#state = {
      searchResults: {
        loading: false,
        data: null,
        error: null,
      },
    };
    this.#render();
  }

  #setState(state) {
    this.#state = state;
    this.#render();
  }

  #render() {
    if (this.#state.searchResults.loading) {
      this.#el.innerHTML = '<h1>Loading...</h1>';
    } else if (this.#state.searchResults.error) {
      this.#el.innerHTML = '<h1>Error!</h1>';
    } else if (!this.#state.searchResults.data) {
      this.#el.innerHTML = '';
    } else {
      this.#el.innerHTML = this.#state.searchResults.data
        .map((cat) => `<article><img src="${cat.url}" /></article>`)
        .join('');
    }
  }

  // public method
  setSearchResults(searchResults) {
    this.#setState({
      ...this.#state,
      searchResults,
    });
  }
}

export default SearchResults;
