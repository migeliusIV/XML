import { Component } from '../component.js';

export class AdminToggle extends Component {
  constructor() {
    super();
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  toggleAdmin() {
    this.isAdmin = !this.isAdmin;
    localStorage.setItem('isAdmin', this.isAdmin);
    // Создаем и диспатчим событие изменения режима
    window.dispatchEvent(new CustomEvent('adminModeChanged', { detail: { isAdmin: this.isAdmin } }));
  }

  render() {
    this.el.className = 'admin-toggle position-fixed';
    this.el.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000;';
    
    this.el.innerHTML = `
      <button class="btn ${this.isAdmin ? 'btn-danger' : 'btn-outline-secondary'}" 
              style="border-radius: 50%; width: 50px; height: 50px; padding: 0; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <span style="font-size: 1.5rem;">${this.isAdmin ? '👑' : '🔒'}</span>
      </button>
    `;

    this.el.querySelector('button').onclick = () => this.toggleAdmin();

    return this.el;
  }
} 