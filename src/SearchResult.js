import Component from './Component.js';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.el = document.querySelector('.app .search-results');
    this.state = {
      loading: false,
      result: [],
      error: null,
    };
    this.render();
  }

  set loading(isLoading) {
    this.setState({
      loading: isLoading,
      result: [],
      error: null,
    });
  }

  set result(result) {
    this.setState({
      loading: false,
      result,
      error: null,
    });
  }

  set error(err) {
    this.setState({
      loading: false,
      result: [],
      error: err,
    });
  }

  render() {
    const { loading, result, error } = this.state;
    if (loading) {
      this.el.innerHTML = '<h1>Loading...</h1>';
      return;
    }
    if (error) {
      this.el.innerHTML = '<h1>Error!</h1>';
      return;
    }
    this.el.innerHTML = result
      .map((item) => `<img src="${item.url}" />`)
      .join('');
  }
}

export default SearchResult;
