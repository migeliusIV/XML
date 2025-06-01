import { Component } from '../component.js';

export class BackButton extends Component {
  constructor() {
    super();
  }
  render() {
    this.el.className = 'btn btn-outline-secondary mb-3';
    this.el.innerText = '← Назад к тарифам';
    this.el.onclick = () => {
      window.location.hash = '#/';
    };
    return this.el;
  }
} 