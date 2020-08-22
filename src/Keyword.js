class Keyword {
  #el;
  #state;
  #props;

  constructor(props) {
    this.#el = document.querySelector('.keyword');
    this.#el.addEventListener('keyup', this.#handleKeyup.bind(this));
    this.#state = {
      keyword: '',
    };
    this.#props = props;
    this.#render();
  }

  #setState(state) {
    this.#state = state;
    this.#render();
  }

  #handleKeyup(e) {
    const { value } = e.target;
    const { key } = e;

    if (key === 'Escape') {
      this.#props.onKeywordsClear();
    } else if (key === 'Enter') {
      this.#props.onSearch(value);
    } else if (key === 'ArrowDown') {
      this.#props.onArrowDown();
    } else if (key === 'ArrowUp') {
      this.#props.onArrowUp();
    } else {
      if (this.#state.keyword === value) return;
      this.#setState({
        ...this.#state,
        keyword: value,
      });
      this.#props.onKeywordChange(value);
    }
  }

  #render() {
    console.log('render Keyword');
    this.#el.value = this.#state.keyword;
  }

  // public method
  setKeyword(keyword) {
    this.#setState({
      ...this.#state,
      keyword,
    });
  }
}

export default Keyword;
