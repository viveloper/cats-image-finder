class SearchResults {
  constructor(props) {
    this.el = document.querySelector('.search-results');
    this.props = props;
    this.state = {
      searchResults: {
        loading: false,
        data: null,
        error: null,
      },
    };
    this.render();
  }

  setSearchResults(searchResults) {
    this.state.searchResults = searchResults;
  }

  render() {
    if (this.state.searchResults.loading) {
      this.el.innerHTML = '<h1>Loading...</h1>';
    } else if (this.state.searchResults.error) {
      this.el.innerHTML = `<h1>${this.state.searchResults.error}</h1>`;
    } else if (!this.state.searchResults.data) {
      this.el.innerHTML = '';
    } else if (this.state.searchResults.data.length === 0) {
      this.el.innerHTML = '<h1>Not found.</h1>';
    } else {
      this.el.innerHTML = this.state.searchResults.data
        .map((cat) => `<article><img src="${cat.url}" /></article>`)
        .join('');
    }
  }
}

export default SearchResults;
