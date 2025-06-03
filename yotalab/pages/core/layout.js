export class BaseLayout {
  static render() {
    const app = document.getElementById('app');
    if (!app) return null;
    
    app.innerHTML = `
      <header id="header-container"></header>
      <main class="container py-4">
        <section id="carousel-container" class="mb-4"></section>
        <section id="content-container">
          <div class="d-flex justify-content-center my-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Загрузка...</span>
            </div>
          </div>
        </section>
      </main>
      <footer class="bg-light py-3 text-center">
        <div class="container">Yota © ${new Date().getFullYear()}</div>
      </footer>
    `;
    
    return {
      headerContainer: document.getElementById('header-container'),
      carouselContainer: document.getElementById('carousel-container'),
      contentContainer: document.getElementById('content-container')
    };
  }
}