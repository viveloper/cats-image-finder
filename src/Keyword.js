class Keyword {
  constructor(props) {
    this.el = document.querySelector('.keyword');
    this.props = props;
    this.state = {
      keyword: '',
    };
    this.el.addEventListener('keyup', this.handleKeyup.bind(this));
    this.render();
  }

  handleKeyup(e) {
    const { value } = e.target;
    const { key } = e;

    if (key === 'Escape') {
      this.props.onKeywordsClear();
    } else if (key === 'Enter') {
      this.props.onEnterKeyup(value);
    } else if (key === 'ArrowDown') {
      this.props.onArrowDown();
    } else if (key === 'ArrowUp') {
      this.props.onArrowUp();
    } else {
      if (this.state.keyword === value) return;
      this.setKeyword(value);
      this.render();
      this.props.onKeywordChange(value);
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
