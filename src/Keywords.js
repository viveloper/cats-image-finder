class Keywords {
  constructor(props) {
    this.el = document.querySelector('.keywords');
    this.props = props;
    this.state = {
      keywords: {
        loading: false,
        data: null,
        error: null,
      },
      keywordIndex: -1,
    };
    this.el.addEventListener('click', this.handleKeywordClick.bind(this));
    this.render();
  }

  handleKeywordClick(e) {
    this.props.onKeywordClick(e.target.dataset.keyword);
  }

  setKeywords(keywords) {
    this.state.keywords = keywords;
  }

  setKeywordIndex(index) {
    this.state.keywordIndex = index;
  }

  incrementKeywordIndex() {
    const nextIndex =
      this.state.keywordIndex + 1 < this.state.keywords.data.length
        ? this.state.keywordIndex + 1
        : this.state.keywordIndex;

    this.state.keywordIndex = nextIndex;
  }

  decrementKeywordIndex() {
    const prevIndex =
      this.state.keywordIndex - 1 >= 0 ? this.state.keywordIndex - 1 : -1;

    this.state.keywordIndex = prevIndex;
  }

  render() {
    if (!this.state.keywords.data || this.state.keywords.data.length === 0) {
      this.el.style.display = 'none';
      this.el.innerHTML = '';
    } else {
      this.el.innerHTML = '';
      this.el.style.display = 'block';
      const $ul = document.createElement('ul');
      this.el.appendChild($ul);
      $ul.innerHTML = this.state.keywords.data
        .map(
          (keyword) =>
            `<li class="keyword-item" data-keyword="${keyword}">${keyword}</li>`
        )
        .join('');
      $ul.querySelectorAll('li').forEach(($li, index) => {
        if (index === this.state.keywordIndex) {
          $li.classList.add('active');
        }
      });
    }
  }
}

export default Keywords;
