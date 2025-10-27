(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 640 && nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  document.querySelectorAll('.link-card[data-href]').forEach((card) => {
    const url = card.getAttribute('data-href');
    if (!url) return;

    card.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') return;
      window.open(url, '_blank', 'noopener');
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.open(url, '_blank', 'noopener');
      }
    });
  });

  const carousel = document.querySelector('.carousel');
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel button.prev');
  const nextBtn = document.querySelector('.carousel button.next');

  if (carousel && track && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    let index = 0;
    let autoId;
    const interval = 3500;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    const startAuto = () => {
      if (slides.length < 2) return;
      if (autoId) clearInterval(autoId);
      autoId = setInterval(() => {
        handleNext(true);
      }, interval);
    };

    const handlePrev = (isAuto = false) => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
      if (!isAuto) startAuto();
    };

    const handleNext = (isAuto = false) => {
      index = (index + 1) % slides.length;
      updateCarousel();
      if (!isAuto) startAuto();
    };

    prevBtn.addEventListener('click', handlePrev);
    nextBtn.addEventListener('click', handleNext);

    carousel.addEventListener('mouseenter', () => autoId && clearInterval(autoId));
    carousel.addEventListener('mouseleave', startAuto);

    updateCarousel();
    startAuto();
  }
})();
