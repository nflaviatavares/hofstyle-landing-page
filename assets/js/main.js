/**
 * Hof Style - Landing Page Scripts
 * Interações, Filtros de Produtos, Seletor de Unidades e FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initProductFilter();
  initUnitSelector();
  initUnitModal();
  initSmoothScroll();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(show) {
    if (show) {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.classList.remove('opacity-0', '-translate-y-4');
        mobileMenu.classList.add('opacity-100', 'translate-y-0');
      }, 10);
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('opacity-100', 'translate-y-0');
      mobileMenu.classList.add('opacity-0', '-translate-y-4');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
      document.body.style.overflow = '';
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* FAQ Accordion */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros itens
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const icon = otherItem.querySelector('.faq-icon');
        if (icon) icon.style.transform = 'rotate(0deg)';
      });

      // Alterna o atual
      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.faq-icon');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* Filtro de Produtos */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.product-filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Atualiza botões ativos
      filterBtns.forEach(b => {
        b.classList.remove('bg-emerald-500', 'text-white', 'border-emerald-500');
        b.classList.add('bg-emerald-950/40', 'text-emerald-300', 'border-emerald-800/50');
      });

      btn.classList.remove('bg-emerald-950/40', 'text-emerald-300', 'border-emerald-800/50');
      btn.classList.add('bg-emerald-500', 'text-white', 'border-emerald-500');

      // Filtra os cards com animação
      productCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        if (category === 'all' || cardCategories.includes(category)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* Filtro de Estado nas Unidades */
function initUnitSelector() {
  const stateBtns = document.querySelectorAll('.state-filter-btn');
  const unitCards = document.querySelectorAll('.unit-card');

  if (!stateBtns.length) return;

  stateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const state = btn.getAttribute('data-state');

      stateBtns.forEach(b => {
        b.classList.remove('bg-[#45aa8c]', 'text-[#031312]', 'font-bold');
        b.classList.add('bg-emerald-950/30', 'text-emerald-200/80', 'font-medium');
      });

      btn.classList.remove('bg-emerald-950/30', 'text-emerald-200/80', 'font-medium');
      btn.classList.add('bg-[#45aa8c]', 'text-[#031312]', 'font-bold');

      unitCards.forEach(card => {
        const cardState = card.getAttribute('data-state') || '';
        if (state === 'all' || cardState === state) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* Modal Global de Solicitação de Catálogo / Escolha de Unidade */
function initUnitModal() {
  const modal = document.getElementById('catalog-modal');
  const openBtns = document.querySelectorAll('.open-catalog-modal');
  const closeBtn = document.getElementById('close-catalog-modal');
  const modalBackdrop = document.getElementById('catalog-modal-backdrop');

  if (!modal) return;

  function openModal(prefillProduct = '') {
    const productNote = document.getElementById('modal-product-note');
    if (productNote) {
      if (prefillProduct) {
        productNote.textContent = `Interesse no produto: ${prefillProduct}`;
        productNote.classList.remove('hidden');
      } else {
        productNote.classList.add('hidden');
      }
    }

    // Salva o produto para montar a mensagem do WhatsApp
    window.currentModalProduct = prefillProduct;

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      const dialog = modal.querySelector('.modal-dialog');
      if (dialog) {
        dialog.classList.remove('scale-95', 'opacity-0');
        dialog.classList.add('scale-100', 'opacity-100');
      }
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('opacity-0');
    const dialog = modal.querySelector('.modal-dialog');
    if (dialog) {
      dialog.classList.add('scale-95', 'opacity-0');
      dialog.classList.remove('scale-100', 'opacity-100');
    }
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || '';
      openModal(product);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Esc para fechar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Ações nos botões de unidades dentro do modal
  const modalUnitLinks = modal.querySelectorAll('.modal-unit-link');
  modalUnitLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const phone = link.getAttribute('data-phone');
      const city = link.getAttribute('data-city');
      let msg = `Olá! Vim pelo site da Hof Style e gostaria de solicitar o catálogo de produtos para a unidade ${city}.`;
      
      if (window.currentModalProduct) {
        msg = `Olá! Vim pelo site da Hof Style e tenho interesse no produto *${window.currentModalProduct}* para a minha clínica (Unidade ${city}). Podem me enviar o catálogo e condições?`;
      }

      link.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    });
  });
}

/* Smooth Scroll */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
