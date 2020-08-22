class Keyword {
  constructor(props) {
    this.el = document.querySelector('.keyword');
    this.props = props;

    // bind event listener
    this.handleKeyup = this.handleKeyup.bind(this);
    this.el.addEventListener('keyup', this.handleKeyup);

    this.render();
  }

  handleKeyup(e) {
    const { value } = e.target;
    const { key } = e;

    this.props.onKeyup({ key, value });
  }

  render() {
    this.el.value = this.props.keyword;
  }

  clear() {
    this.el.removeEventListener('keyup', this.handleKeyup);
  }
}

export default Keyword;
