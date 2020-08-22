class Keywords {
  #el;
  #state;
  #props;

  constructor(props) {
    this.#el = document.querySelector('.keywords');
    this.#el.addEventListener('click', this.#handleKeywordClick.bind(this));
    this.#props = props;
    this.#state = {
      keywords: [],
      keywordIndex: -1,
    };
    this.#render();
  }

  #setState(state) {
    this.#state = state;
    this.#render();
  }

  #handleKeywordClick(e) {
    this.props.onKeywordClick(e.target.dataset.keyword);
  }

  #render() {
    console.log('render Keywords');

    if (!this.#state.keywords || this.#state.keywords.length === 0) {
      this.#el.style.display = 'none';
      this.#el.innerHTML = '';
    } else {
      this.#el.innerHTML = '';
      this.#el.style.display = 'block';
      const $ul = document.createElement('ul');
      this.#el.appendChild($ul);
      $ul.innerHTML = this.#state.keywords
        .map(
          (keyword) =>
            `<li class="keyword-item" data-keyword="${keyword}">${keyword}</li>`
        )
        .join('');
      $ul.querySelectorAll('li').forEach(($li, index) => {
        if (index === this.#state.keywordIndex) {
          $li.classList.add('active');
        }
      });
    }
  }

  // public method
  setKeywords(keywords) {
    this.#setState({
      ...this.#state,
      keywords,
    });
  }

  setKeywordIndex(index) {
    this.#setState({
      ...this.#state,
      keywordIndex: index,
    });
  }
}

export default Keywords;
