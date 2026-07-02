// ---------- Mobile nav toggle ----------
document.querySelectorAll('[data-nav-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const menu = document.querySelector('[data-nav-mobile]');
    if (menu) menu.classList.toggle('open');
  });
});

// ---------- Search ----------
(function () {
  const CATEGORY_SLUGS = {
    "Prints": "prints",
    "Stickers y adhesivos": "stickers",
    "Papelería": "papeleria",
    "Emprendedores": "emprendedores",
    "Merch": "merch",
  };

  function setupSearch(root) {
    const input = root.querySelector('.search-input');
    const results = root.querySelector('.search-results');
    if (!input || !results || typeof PRODUCTS === 'undefined') return;

    function render(q) {
      const query = q.trim().toLowerCase();
      results.innerHTML = '';
      if (!query) { results.classList.remove('show'); return; }

      const matches = PRODUCTS.filter(
        (p) => !p.name.includes('—') && p.name.toLowerCase().includes(query)
      ).slice(0, 8);

      if (matches.length === 0) {
        results.innerHTML = '<div class="search-empty">Sin resultados</div>';
        results.classList.add('show');
        return;
      }

      matches.forEach((p) => {
        const a = document.createElement('a');
        a.className = 'search-result-item';
        const slug = CATEGORY_SLUGS[p.category];
        a.href = slug ? `${slug}.html#${p.slug}` : '#';
        a.innerHTML = `<p class="name">${p.name}</p><p class="cat">${p.category}</p>`;
        results.appendChild(a);
      });
      results.classList.add('show');
    }

    input.addEventListener('input', () => render(input.value));
    input.addEventListener('focus', () => render(input.value));
    document.addEventListener('click', (e) => {
      if (!root.contains(e.target)) results.classList.remove('show');
    });
  }

  document.querySelectorAll('[data-search]').forEach(setupSearch);
})();

// ---------- Scroll to product on load (from #hash) ----------
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    const el = document.getElementById(window.location.hash.slice(1));
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    }
  }
});
