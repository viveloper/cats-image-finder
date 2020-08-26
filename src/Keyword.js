import Component from './Component.js';

class Keyword extends Component {
  constructor() {
    const el = document.querySelector('.keyword');
    const initialState = {
      keyword: '',
    };
    super(el, initialState);
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.on('keyup', this.handleKeyup.bind(this));
  }

  handleKeyup(e) {
    const { value } = e.target;
    const { key } = e;

    if (key === 'Escape') {
      this.emit('@keywordClear');
    } else if (key === 'Enter') {
      this.emit('@enterKeyup', value);
    } else if (key === 'ArrowDown') {
      this.emit('@arrowDown');
    } else if (key === 'ArrowUp') {
      this.emit('@arrowUp');
    } else {
      if (this.state.keyword === value) return;
      this.setKeyword(value);
      this.render();
      this.emit('@keywordChange', value);
    }
  }

  setKeyword(keyword) {
    this.state.keyword = keyword;
  }

  render() {
    this.el.value = this.state.keyword;
  }
}

export default Keyword;
