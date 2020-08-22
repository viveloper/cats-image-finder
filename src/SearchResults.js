class SearchResults {
  constructor(props) {
    this.el = document.querySelector('.search-results');
    this.props = props;
    this.render();
  }

  render() {
    if (this.props.loading) {
      this.el.innerHTML = '<h1>Loading...</h1>';
    } else if (this.props.error) {
      this.el.innerHTML = '<h1>Error!</h1>';
    } else if (!this.props.searchResults) {
      this.el.innerHTML = '';
    } else {
      this.el.innerHTML = this.props.searchResults
        .map((cat) => `<article><img src="${cat.url}" /></article>`)
        .join('');
    }
  }

  clear() {
    this.el.innerHTML = '';
  }
}

export default SearchResults;
