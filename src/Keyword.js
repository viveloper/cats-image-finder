import Component from './Component.js';

class Keyword extends Component {
  constructor(props) {
    super(props);
    this.el = document.querySelector('.app header input.keyword');
    this.state = {
      value: '',
    };
    this.render();
    this.bindEvents();
  }
  bindEvents() {
    this.el.addEventListener('keyup', this.handleKeyup.bind(this));
  }
  async handleKeyup(e) {
    if (e.target.value !== this.state.value) {
      this.setState({
        value: e.target.value,
      });
      this.props.onValueChange(e.target.value);
    }
    if (e.key === 'Enter') {
      this.props.onEnterKeyup(this.state.value);
    }
    if (e.key === 'Escape') {
      this.props.onEscapeKeyup();
    }
    if (e.key === 'ArrowUp') {
      this.props.onArrowUpKeyup();
    }
    if (e.key === 'ArrowDown') {
      this.props.onArrowDownKeyup();
    }
  }
  set value(value) {
    this.setState({
      value,
    });
  }
  render() {
    const { value } = this.state;
    this.el.value = value;
  }
}

export default Keyword;
