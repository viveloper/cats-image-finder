class Component {
  constructor(el, initialstate = {}) {
    this.el = el;
    this.state = initialstate;
  }

  emit(eventName, data) {
    const customEvent = new CustomEvent(eventName, { detail: data });
    this.el.dispatchEvent(customEvent);
  }

  on(eventName, eventHandler) {
    this.el.addEventListener(eventName, eventHandler);
  }

  render() {}
}

export default Component;
