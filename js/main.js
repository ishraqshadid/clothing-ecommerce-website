import products from './products.js';
import blogPosts from './blog.js';

// ─── CART Persistence & Operations ────────────────────────────
const CART_KEY = 'oura_cart';
function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(cart); }
function addToCart(productId, size, qty = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const existingIdx = cart.findIndex(item => item.id === productId && item.size === size);
  if (existingIdx > -1) { cart[existingIdx].qty += qty; } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.mainImage, sizes: product.sizes, size: size, qty: qty });
  }
  saveCart(cart); showToast(`"${product.name}" added to cart`); bumpCartBadge();
}
function removeFromCart(index) { const cart = getCart(); cart.splice(index, 1); saveCart(cart); }
function updateCartQty(index, newQty) { const cart = getCart(); if (!cart[index]) return; cart[index].qty = Math.max(1, newQty); saveCart(cart); }
function updateCartSize(index, newSize) { const cart = getCart(); if (!cart[index]) return; cart[index].size = newSize; saveCart(cart); }
function updateCartBadge(cart) {
  const currentCart = cart || getCart();
  const total = currentCart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => { el.textContent = total; el.style.display = total === 0 ? 'none' : 'inline-flex'; });
}
function bumpCartBadge() { document.querySelectorAll('.cart-count').forEach(el => { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); setTimeout(() => el.classList.remove('bump'), 300); }); }

// ─── WISHLIST Persistence & Operations ────────────────────────────
const WISHLIST_KEY = 'oura_wishlist';
function getWishlist() { try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; } catch { return []; } }
function toggleWishlist(productId, btnElement) {
  let wishlist = getWishlist();
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    if (btnElement) btnElement.classList.remove('is-fav');
    showToast("Removed from wishlist");
  } else {
    wishlist.push(productId);
    if (btnElement) btnElement.classList.add('is-fav');
    showToast("Added to wishlist");
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

// ─── PRODUCT CARD Shared Helper ───────────────────────────────
function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.setAttribute('data-id', product.id);

  const defaultSize = product.sizes[0] || '';
  const wishlist = getWishlist();
  const isFavClass = wishlist.includes(product.id) ? 'is-fav' : '';

  // Badges & Stock Support
  const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
  const stockClass = product.stockStatus ? product.stockStatus.toLowerCase().replace(/ /g, '-') : 'in-stock';

  card.innerHTML = `
    <a href="product-detail.html?id=${product.id}" class="product-card__image-wrap" aria-label="View ${product.name}">
      ${badgeHTML}
      <img src="${product.mainImage}" alt="${product.name}" loading="lazy" onerror="this.style.opacity='0'" />
      <div class="card-actions" role="group" aria-label="Quick actions">
        <button class="card-action-btn add-btn" aria-label="Add to cart" data-id="${product.id}" data-size="${defaultSize}" title="Add to cart">${iconCart()}</button>
        <button class="card-action-btn fav-btn ${isFavClass}" aria-label="Add to favourites" title="Add to favourites">${iconHeart()}</button>
      </div>
    </a>
    <div class="product-card__info">
      <p class="product-card__name">${product.name}</p>
      <p class="product-card__price">$${product.price.toFixed(2)}</p>
      <p class="product-stock status-${stockClass}">${product.stockStatus || 'In Stock'}</p>
    </div>
  `;

  card.querySelector('.add-btn').addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    addToCart(product.id, defaultSize, 1);
  });
  card.querySelector('.fav-btn').addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    toggleWishlist(product.id, e.currentTarget);
    // Re-render wishlist if we are on the wishlist page
    if (window.location.pathname.includes('wishlist.html')) renderWishlistPage();
  });
  return card;
}

function iconCart() { return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`; }
function iconHeart() { return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`; }

// ─── PAGE RENDERING FUNCTIONS ──────────────────────────────────
function renderAllProducts() {
  const grid = document.getElementById('all-products-grid');
  const filter = document.getElementById('category-filter');
  if (!grid) return;
  const selected = filter ? filter.value : 'all';
  let filtered = products;
  if (selected && selected !== 'all') { filtered = products.filter(p => p.categories.map(c => c.toLowerCase()).includes(selected.toLowerCase())); }
  const toShow = filtered.slice(0, 12);
  grid.innerHTML = '';
  if (toShow.length === 0) { grid.innerHTML = '<p class="no-products">No products found.</p>'; return; }
  toShow.forEach(p => grid.appendChild(createProductCard(p)));
}

function renderTrendingProducts() {
  const grid = document.getElementById('trending-grid');
  if (!grid) return;
  const trending = products.filter(p => p.trending).slice(0, 8);
  grid.innerHTML = '';
  if (trending.length === 0) { grid.innerHTML = '<p class="no-products">No trending products.</p>'; return; }
  trending.forEach(p => grid.appendChild(createProductCard(p)));
}

function populateCategoryFilter() {
  const filter = document.getElementById('category-filter');
  if (!filter) return;
  const categories = [...new Set(products.flatMap(p => p.categories))].sort();
  categories.forEach(cat => { const opt = document.createElement('option'); opt.value = cat; opt.textContent = cat; filter.appendChild(opt); });
  filter.addEventListener('change', () => {
    if (document.getElementById('full-products-grid')) renderProductsPage();
    else renderAllProducts();
  });
}

// Full Products Page Logic (Search, Sort, Filter)
function renderProductsPage() {
  const grid = document.getElementById('full-products-grid');
  const filter = document.getElementById('category-filter');
  const sort = document.getElementById('product-sort');
  const search = document.getElementById('product-search');
  if (!grid) return;

  const selectedCat = filter ? filter.value : 'all';
  const sortBy = sort ? sort.value : 'default';
  const searchVal = search ? search.value.toLowerCase() : '';

  // 1. Filter Category & Search Match
  let results = products.filter(p => {
    const matchCat = (selectedCat === 'all' || p.categories.map(c => c.toLowerCase()).includes(selectedCat.toLowerCase()));
    const matchSearch = p.name.toLowerCase().includes(searchVal) || p.categories.join(' ').toLowerCase().includes(searchVal);
    return matchCat && matchSearch;
  });

  // 2. Sort Logic
  if (sortBy === 'price-low') results.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') results.sort((a, b) => b.price - a.price);
  if (sortBy === 'newest') results.sort((a, b) => (b.newArrival === a.newArrival) ? 0 : b.newArrival ? 1 : -1);
  if (sortBy === 'popular') results.sort((a, b) => (b.bestSelling === a.bestSelling) ? 0 : b.bestSelling ? 1 : -1);

  grid.innerHTML = '';
  if (results.length === 0) { grid.innerHTML = '<p class="no-products">No products matched your criteria.</p>'; return; }

  // Renders up to 28 products by default for layout requirement
  results.slice(0, 28).forEach(p => grid.appendChild(createProductCard(p)));
}

// Wishlist Page Logic
function renderWishlistPage() {
  const grid = document.getElementById('wishlist-grid');
  if (!grid) return;
  const wishlist = getWishlist();
  const items = products.filter(p => wishlist.includes(p.id));

  grid.innerHTML = '';
  if (items.length === 0) { grid.innerHTML = '<p class="no-products" style="grid-column: 1/-1;">Your wishlist is empty.</p>'; return; }
  items.forEach(p => grid.appendChild(createProductCard(p)));
}

// Blog Page Logic
function renderBlogPage() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  blogPosts.forEach(post => {
    grid.innerHTML += `
      <article class="blog-card">
        <div class="blog-card__img"><img src="${post.image}" alt="${post.title}"></div>
        <div class="blog-card__meta">${post.category} · ${post.date}</div>
        <h3 class="blog-card__title">${post.title}</h3>
        <p class="blog-card__excerpt">${post.excerpt}</p>
        <a href="#" class="blog-card__read-more">Read More</a>
      </article>
    `;
  });
}

// Cart & Checkout Logic
function renderCartPage() {
  const cartList = document.getElementById('cart-list');
  const cartHeading = document.getElementById('cart-item-count');
  if (!cartList) return;
  const cart = getCart();
  if (cartHeading) { const total = cart.reduce((s, i) => s + i.qty, 0); cartHeading.textContent = `(${total} item${total !== 1 ? 's' : ''})`; }
  if (cart.length === 0) {
    cartList.innerHTML = `<div class="cart-empty"><h3>Your bag is empty</h3><p>Add something beautiful to get started.</p><a href="products.html" class="btn btn--outline">Continue Shopping</a></div>`;
    updateOrderSummary(cart); return;
  }
  cartList.innerHTML = '';
  cart.forEach((item, index) => renderCartItem(item, index, cartList));
  updateOrderSummary(cart);
}

function renderCartItem(item, index, container) {
  const row = document.createElement('div'); row.className = 'cart-item'; row.setAttribute('data-index', index);
  const sizeOptions = item.sizes.map(s => `<option value="${s}" ${s === item.size ? 'selected' : ''}>${s}</option>`).join('');
  row.innerHTML = `
    <img class="cart-item__image" src="${item.image}" alt="${item.name}" onerror="this.style.opacity='0.3'" />
    <div class="cart-item__details">
      <a href="product-detail.html?id=${item.id}" class="cart-item__name">${item.name}</a>
      <div class="cart-item__meta">
        <label class="sr-only" for="size-${index}">Size</label>
        <select class="size-select" id="size-${index}" aria-label="Select size">${sizeOptions}</select>
        <div class="qty-control" role="group" aria-label="Quantity">
          <button class="qty-btn qty-minus" aria-label="Decrease quantity" ${item.qty <= 1 ? 'disabled' : ''}>−</button>
          <span class="qty-display" aria-live="polite">${item.qty}</span>
          <button class="qty-btn qty-plus" aria-label="Increase quantity">+</button>
        </div>
      </div>
    </div>
    <div class="cart-item__right">
      <span class="cart-item__price">$${(item.price * item.qty).toFixed(2)}</span>
      <button class="delete-btn" aria-label="Remove ${item.name} from cart">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
      </button>
    </div>
  `;
  row.querySelector('.size-select').addEventListener('change', e => {
    updateCartSize(index, e.target.value);
    showToast(`Size updated to ${e.target.value}`);
  });
  row.querySelector('.qty-minus').addEventListener('click', () => { const cart = getCart(); updateCartQty(index, cart[index].qty - 1); renderCartPage(); });
  row.querySelector('.qty-plus').addEventListener('click', () => { const cart = getCart(); updateCartQty(index, cart[index].qty + 1); renderCartPage(); });
  row.querySelector('.delete-btn').addEventListener('click', () => { removeFromCart(index); renderCartPage(); });
  container.appendChild(row);
}

function updateOrderSummary(cart) {
  const SHIPPING_FEE = 8.00; const FREE_SHIPPING = 150;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const el = id => document.getElementById(id);
  if (el('summary-subtotal')) el('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  if (el('summary-shipping')) el('summary-shipping').textContent = shipping === 0 && subtotal > 0 ? 'Free' : shipping === 0 ? '—' : `$${shipping.toFixed(2)}`;
  if (el('summary-total')) el('summary-total').textContent = `$${total.toFixed(2)}`;
  const placeOrderBtn = document.getElementById('place-order-btn');
  if (placeOrderBtn) placeOrderBtn.disabled = cart.length === 0;
}

function handleCheckoutFlow() {
  const placeOrderBtn = document.getElementById('place-order-btn');
  const confirmOrderBtn = document.getElementById('confirm-order-btn');
  const checkoutForm = document.getElementById('checkout-form');

  // 1. Open Customer Info Form Modal
  placeOrderBtn?.addEventListener('click', () => {
    if (getCart().length === 0) return;
    openModal('checkout-modal');
  });

  // 2. Confirm Order (Gather data, validate, send to WhatsApp, clear cart)
  confirmOrderBtn?.addEventListener('click', (e) => {
    e.preventDefault();


    if (checkoutForm && !checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();
      return;
    }

    // 1. Gather Customer Info
    const name = document.getElementById('checkout-name').value;
    const phone = document.getElementById('checkout-phone').value;
    const area = document.getElementById('checkout-area').value;
    const address = document.getElementById('checkout-address').value;
    const note = document.getElementById('checkout-note').value;

    // 2. Gather Cart Info
    const cart = getCart();
    if (cart.length === 0) return;


    const orderDetails = cart.map(item => `▪ [ID: ${item.id}] ${item.name} (${item.size}) x${item.qty} - $${(item.price * item.qty).toFixed(2)}`).join('\n');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal >= 150 ? 0 : 8.00;
    const total = subtotal + shipping;


    const message = `*NEW ORDER - ŌURA*\n\n*Customer Details:*\nName: ${name}\nPhone: ${phone}\nArea: ${area}\nAddress: ${address}\nNote: ${note || 'None'}\n\n*Order Summary:*\n${orderDetails}\n\nSubtotal: $${subtotal.toFixed(2)}\nShipping: ${shipping === 0 ? 'Free' : '$8.00'}\n*Total: $${total.toFixed(2)}*`;


    const encodedMessage = encodeURIComponent(message);


    const whatsappUrl = `https://wa.me/8801111111?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // 5. Clean up UI & Show Success
    closeModal('checkout-modal');
    saveCart([]);
    renderCartPage();
    setTimeout(() => openModal('order-success-modal'), 400);
  });
}
// Product Detail Logic
function renderDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'), 10);
  const product = products.find(p => p.id === productId);

  if (!product) {
    document.getElementById('detail-container')?.insertAdjacentHTML('beforeend', `<div style="text-align:center;padding:8rem 0"><h2 style="font-style:italic;margin-bottom:1.6rem">Product not found</h2><a href="products.html" class="btn btn--outline">Back to Shop</a></div>`);
    return;
  }

  document.title = `${product.name} — ŌURA`;
  const crumb = document.getElementById('detail-breadcrumb');
  if (crumb) crumb.innerHTML = `<a href="index.html">Home</a> / <a href="products.html">Shop</a> / ${product.categories[0] || ''} / <span>${product.name}</span>`;

  setText('detail-name', product.name);
  setText('detail-price', `$${product.price.toFixed(2)}`);
  setText('detail-description', product.description);

  const mainImg = document.getElementById('gallery-main-img');
  if (mainImg) { mainImg.src = product.mainImage; mainImg.alt = product.name; }

  const thumbsWrap = document.getElementById('gallery-thumbs');
  if (thumbsWrap && product.gallery.length > 0) {
    thumbsWrap.innerHTML = '';
    product.gallery.forEach((src, i) => {
      const img = document.createElement('img');
      img.className = `gallery-thumb ${i === 0 ? 'active' : ''}`; img.src = src; img.alt = `${product.name} view ${i + 1}`; img.loading = 'lazy';
      img.addEventListener('click', () => {
        if (mainImg) { mainImg.classList.add('fading'); setTimeout(() => { mainImg.src = src; mainImg.classList.remove('fading'); }, 180); }
        thumbsWrap.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active')); img.classList.add('active');
      });
      thumbsWrap.appendChild(img);
    });
  }

  const sizeWrap = document.getElementById('size-options');
  let selectedSize = product.sizes[0] || '';
  if (sizeWrap) {
    sizeWrap.innerHTML = '';
    product.sizes.forEach((size, i) => {
      const btn = document.createElement('button');
      btn.className = `size-option ${i === 0 ? 'selected' : ''}`; btn.textContent = size; btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      btn.addEventListener('click', () => { selectedSize = size; sizeWrap.querySelectorAll('.size-option').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed', 'false'); }); btn.classList.add('selected'); btn.setAttribute('aria-pressed', 'true'); });
      sizeWrap.appendChild(btn);
    });
  }

  let qty = 1;
  const qtyDisplay = document.getElementById('detail-qty-display'), qtyMinus = document.getElementById('detail-qty-minus'), qtyPlus = document.getElementById('detail-qty-plus');
  function updateQtyDisplay() { if (qtyDisplay) qtyDisplay.textContent = qty; if (qtyMinus) qtyMinus.disabled = qty <= 1; }
  qtyMinus?.addEventListener('click', () => { qty = Math.max(1, qty - 1); updateQtyDisplay(); });
  qtyPlus?.addEventListener('click', () => { qty += 1; updateQtyDisplay(); });
  updateQtyDisplay();

  const addBtn = document.getElementById('detail-add-to-cart');
  addBtn?.addEventListener('click', () => {
    addToCart(product.id, selectedSize, qty);
    addBtn.textContent = 'Added!'; addBtn.disabled = true; setTimeout(() => { addBtn.textContent = 'Add to Cart'; addBtn.disabled = false; }, 1400);
  });

  // Render Related Products
  const relatedGrid = document.getElementById('related-grid');
  if (relatedGrid) {
    const related = products.filter(p => p.id !== product.id && p.categories.some(c => product.categories.includes(c))).slice(0, 4);
    related.forEach(p => relatedGrid.appendChild(createProductCard(p)));
  }
}
function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = value; }

// ─── UI HELPERS ────────────────────────────────────────────────
let toastTimer = null;
function showToast(message, duration = 2600) {
  let toast = document.getElementById('app-toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'app-toast'; toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = message; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}
function openModal(modalId) { document.getElementById(modalId)?.classList.add('open'); }
function closeModal(modalId) { document.getElementById(modalId)?.classList.remove('open'); }
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay.id); });
    overlay.querySelectorAll('.modal-close, [data-close-modal]').forEach(btn => btn.addEventListener('click', () => closeModal(overlay.id)));
  });
  // Size guide trigger
  document.getElementById('trigger-size-guide')?.addEventListener('click', (e) => { e.preventDefault(); openModal('size-guide-modal'); });
}
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => { e.preventDefault(); const input = form.querySelector('input[type="email"]'); if (!input?.value) return; showToast('Thanks for subscribing!'); input.value = ''; });
}
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10), { passive: true });
}

// ─── NEW: MOBILE NAV ───────────────────────────────────────────
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
  }
}

// ─── BOOT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll(); updateCartBadge(); initModals(); initNewsletter(); initMobileNav();
  const path = window.location.pathname;

  if (path.includes('products.html')) {
    populateCategoryFilter(); renderProductsPage();
    document.getElementById('product-search')?.addEventListener('input', renderProductsPage);
    document.getElementById('product-sort')?.addEventListener('change', renderProductsPage);
  } else if (path.includes('wishlist.html')) {
    renderWishlistPage();
  } else if (path.includes('blog.html')) {
    renderBlogPage();
  } else if (path.endsWith('index.html') || path === '/' || path.endsWith('/shop/')) {
    populateCategoryFilter(); renderAllProducts(); renderTrendingProducts();
  } else if (path.includes('cart.html')) {
    renderCartPage(); handleCheckoutFlow();
  } else if (path.includes('product-detail.html')) {
    renderDetailPage();
  }
});


