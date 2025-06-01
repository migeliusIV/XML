import { Component } from '../component.js';

export class Modal extends Component {
  constructor(content) {
    super();
    this.content = content;
  }

  render() {
    this.el.innerHTML = `
      <div class="modal-backdrop fade show" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 1040;"></div>
      <div class="modal fade show" style="display: block; z-index: 1050;" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content" style="border-radius: 1rem; border: none; box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);">
            <div class="modal-header" style="border-bottom: none; padding: 1.5rem 1.5rem 0.5rem;">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="padding: 0.5rem 1.5rem 1.5rem;">
            </div>
          </div>
        </div>
      </div>
    `;

    // Добавляем обработчик для закрытия модального окна
    const closeBtn = this.el.querySelector('.btn-close');
    const backdrop = this.el.querySelector('.modal-backdrop');
    const modalBody = this.el.querySelector('.modal-body');
    
    // Вставляем содержимое в тело модального окна
    if (this.content && modalBody) {
      modalBody.appendChild(this.content);
    }

    const closeModal = () => {
      this.el.remove();
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal();
      }
    });

    // Добавляем обработчик для клавиши Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    return this.el;
  }
} 