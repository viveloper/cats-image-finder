import Component from './Component.js';

class Keywords extends Component {
  constructor(props) {
    super(props);
    this.el = document.querySelector('.app .keywords');
    this.state = {
      keywords: [],
      activeKeywordIdx: -1,
    };
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    this.el.addEventListener('click', this.handleClick.bind(this));
  }
  get keywords() {
    return this.state.keywords;
  }
  set keywords(keywords) {
    this.setState({
      keywords,
      activeKeywordIdx: -1,
    });
  }
  get activeKeywordIdx() {
    return this.state.activeKeywordIdx;
  }
  set activeKeywordIdx(index) {
    this.setState({
      activeKeywordIdx: index,
    });
  }

  handleClick(e) {
    this.props.onKeywordClick(e.target.textContent);
  }

  render() {
    const { keywords, activeKeywordIdx } = this.state;
    this.el.style.display = keywords.length ? 'block' : 'none';
    this.el.innerHTML = `
      <ul>
        ${keywords
          .map(
            (keyword, index) =>
              `<li class="${
                index === activeKeywordIdx ? 'active' : ''
              }">${keyword}</li>`
          )
          .join('')}
      </ul>
    `;
  }
}

export default Keywords;
