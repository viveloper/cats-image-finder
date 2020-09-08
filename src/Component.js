class Component {
  constructor(props) {
    this.props = props;
  }
  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.render();
  }
  render() {}
}

export default Component;
