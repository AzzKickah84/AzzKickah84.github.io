(function () {
  const search = document.getElementById('search');
  const navItems = document.querySelectorAll('.nav-item');
  const blocks = document.querySelectorAll('.category-block');
  const cards = document.querySelectorAll('.app-card');
  let activeCat = 'all';

  function applyFilters() {
    const q = (search && search.value || '').trim().toLowerCase();
    cards.forEach(card => {
      const title = (card.dataset.title || '').toLowerCase();
      const cat = card.dataset.category || '';
      const catOk = activeCat === 'all' || cat === activeCat;
      const textOk = !q || title.includes(q) || (card.textContent || '').toLowerCase().includes(q);
      card.classList.toggle('hidden', !(catOk && textOk));
    });
    blocks.forEach(block => {
      const visible = block.querySelectorAll('.app-card:not(.hidden)').length > 0;
      block.classList.toggle('hidden', !visible);
    });
  }

  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      navItems.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat || 'all';
      applyFilters();
      if (activeCat !== 'all') {
        const target = document.getElementById('cat-' + activeCat);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (search) search.addEventListener('input', applyFilters);
})();
