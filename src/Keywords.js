class Keywords {
  constructor(props) {
    this.el = document.querySelector('.keywords');
    this.props = props;

    this.handleKeywordClick = this.handleKeywordClick.bind(this);
    this.el.addEventListener('click', this.handleKeywordClick);

    this.render();
  }

  handleKeywordClick(e) {
    this.props.onKeywordClick(e.target.dataset.keyword);
  }

  render() {
    this.el.style.display = 'block';
    const $ul = document.createElement('ul');
    this.el.appendChild($ul);
    $ul.innerHTML = this.props.keywords
      .map(
        (keyword) =>
          `<li class="keyword-item" data-keyword="${keyword}">${keyword}</li>`
      )
      .join('');
    $ul.querySelectorAll('li').forEach(($li, index) => {
      if (index === this.props.keywordIndex) {
        $li.classList.add('active');
      }
    });
  }

  clear() {
    this.el.style.display = 'none';
    this.el.innerHTML = '';
    this.el.removeEventListener('click', this.handleKeywordClick);
  }
}

export default Keywords;
