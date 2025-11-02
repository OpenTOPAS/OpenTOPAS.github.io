(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');

  if (nav) {
    const navItems = [
      { href: 'about.html', label: 'About' },
      { href: 'download.html', label: 'Download' },
      { href: 'documentation.html', label: 'Documentation' },
      { href: 'https://github.com/OpenTOPAS/OpenTOPAS/discussions', label: 'User Forum', external: true },
      { href: 'publications.html', label: 'Publications' },
      { href: 'contact.html', label: 'Contact' },
    ];

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    nav.innerHTML = navItems
      .map(({ href, label, external }) => {
        const isActive = !external && currentPath === href;
        const attrs = [
          `href="${href}"`,
          external ? 'target="_blank"' : '',
          external ? 'rel="noopener noreferrer"' : '',
          isActive ? 'aria-current="page"' : '',
        ]
          .filter(Boolean)
          .join(' ');
        const suffix = external ? ' <span class="external-icon" aria-hidden="true">&#8599;</span>' : '';
        return `<a ${attrs}>${label}${suffix}</a>`;
      })
      .join('');
  }

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
      window.open(url, '_blank', 'noopener,noreferrer');
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer');
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
