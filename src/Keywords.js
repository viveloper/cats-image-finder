import Component from './Component.js';

class Keywords extends Component {
  constructor() {
    const el = document.querySelector('.keywords');
    const initialState = {
      keywords: {
        loading: false,
        data: null,
        error: null,
      },
      keywordIndex: -1,
    };
    super(el, initialState);
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.on('click', this.handleKeywordClick.bind(this));
  }

  handleKeywordClick(e) {
    this.emit('@keywordClick', e.target.dataset.keyword);
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
