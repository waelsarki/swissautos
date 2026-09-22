document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const filterButtons = document.querySelectorAll('.filter-button');
  const inventoryCards = document.querySelectorAll('.inventory-card');
  const viewMoreButton = document.querySelector('.view-more-button');
  const viewMoreLabel = viewMoreButton.querySelector('span');
  const galleryMore = viewMoreButton.closest('.gallery-more');
  let galleryExpanded = false;

  const updateGallery = (filter) => {
    const matchingCards = [...inventoryCards].filter((card) => filter === 'all' || card.dataset.category === filter);
    const visibleCards = galleryExpanded ? matchingCards : matchingCards.slice(0, 5);
    inventoryCards.forEach((card) => {
      const isVisible = visibleCards.includes(card);
      card.classList.toggle('is-hidden', !isVisible);
      if (isVisible) card.classList.add('visible');
    });
    viewMoreButton.setAttribute('aria-expanded', String(galleryExpanded));
    viewMoreLabel.textContent = galleryExpanded ? 'Show fewer cars' : `View more cars (${Math.max(matchingCards.length - 5, 0)} more)`;
    galleryMore.hidden = matchingCards.length <= 5;
  };

  updateGallery('all');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      updateGallery(filter);
    });
  });

  viewMoreButton.addEventListener('click', () => {
    galleryExpanded = !galleryExpanded;
    updateGallery(document.querySelector('.filter-button.active').dataset.filter);
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
});
