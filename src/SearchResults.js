class SearchResults {
  constructor(props) {
    this.el = document.querySelector('.search-results');
    this.props = props;
    this.render();
  }

  render() {
    this.el.innerHTML = this.props.searchResults
      .map((cat) => `<article><img src="${cat.url}" /></article>`)
      .join('');
  }

  clear() {
    this.el.innerHTML = '';
  }
}

export default SearchResults;
