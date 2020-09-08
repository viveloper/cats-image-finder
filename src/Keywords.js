import Component from './Component.js';

class Keywords extends Component {
  constructor(props) {
    super(props);
    this.el = document.querySelector('.app .keywords');
    this.state = {
      keywords: [],
    };
    this.render();
  }

  set keywords(keywords) {
    this.setState({
      keywords,
    });
  }

  render() {
    const { keywords } = this.state;
    this.el.style.display = keywords.length ? 'block' : 'none';
    this.el.innerHTML = `
      <ul>
        ${keywords.map((keyword) => `<li>${keyword}</li>`).join('')}
      </ul>
    `;
  }
}

export default Keywords;
