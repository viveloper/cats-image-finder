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
      .map((keyword) => `<li data-keyword="${keyword}">${keyword}</li>`)
      .join('');
  }

  clear() {
    this.el.style.display = 'none';
    this.el.innerHTML = '';
  }
}

export default Keywords;
