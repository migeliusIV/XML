export class Page {
  constructor(props = {}) {
    this.props = props;
    this.el = document.createElement('div');
  }
  render() {
    return this.el;
  }
} 