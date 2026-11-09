// Base de datos ampliada de productos
const products = [
  {
    id: 1,
    name: "Labial Mate Velvet Rose",
    category: "maquillaje",
    price: 18.99,
    rating: "★★★★★ (48)",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80",
    description: "Labial líquido de alta pigmentación con acabado mate sedoso y larga duración de hasta 12 horas sin resecar los labios."
  },
  {
    id: 2,
    name: "Sérum Capilar Aceite de Argán",
    category: "pelo",
    price: 24.50,
    rating: "★★★★★ (62)",
    image: "https://images.unsplash.com/photo-1608248597260-657d64438a78?auto=format&fit=crop&w=500&q=80",
    description: "Nutrición intensa con aceite de argán marroquí para reparar puntas abiertas y controlar el encrespamiento al instante."
  },
  {
    id: 3,
    name: "Base de Maquillaje Glow Radiance",
    category: "maquillaje",
    price: 29.00,
    rating: "★★★★☆ (35)",
    image: "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?auto=format&fit=crop&w=500&q=80",
    description: "Fórmula ligera enriquecida con ácido hialurónico que unifica el tono aportando una luminosidad natural."
  },
  {
    id: 4,
    name: "Máscara Reparadora de Keratina",
    category: "pelo",
    price: 22.00,
    rating: "★★★★★ (51)",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=500&q=80",
    description: "Tratamiento intensivo de reconstrucción capilar para devolver la fuerza, suavidad y elasticidad al cabello dañado."
  },
  {
    id: 5,
    name: "Paleta de Sombras Nude Earth",
    category: "maquillaje",
    price: 34.99,
    rating: "★★★★★ (89)",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=500&q=80",
    description: "12 tonos cálidos versátiles entre mates aterciopelados y satinados para cualquier ocasión."
  },
  {
    id: 6,
    name: "Champú Sin Sulfatos Hidratante",
    category: "pelo",
    price: 16.50,
    rating: "★★★★☆ (29)",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=500&q=80",
    description: "Limpieza ultrasuave que protege la hidratación natural del cuero cabelludo y prolonga el color en cabellos teñidos."
  },
  {
    id: 7,
    name: "Iluminador Líquido Golden Glow",
    category: "maquillaje",
    price: 21.00,
    rating: "★★★★★ (40)",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80",
    description: "Gotas iluminadoras multiusos para rostro y cuerpo que proporcionan un brillo deslumbrante de aspecto saludable."
  },
  {
    id: 8,
    name: "Protector Térmico & Brillo Capilar",
    category: "pelo",
    price: 19.50,
    rating: "★★★★★ (55)",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80",
    description: "Spray protector térmico hasta 230°C. Evita el daño por planchas o secadores dejando un acabado suave y brillante."
  }
];

let cart = [];
let currentCategory = 'all';

// Renderizar Productos
function renderProducts(items) {
  const container = document.getElementById('product-grid');
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; padding: 2rem;">No se encontraron productos que coincidan con la búsqueda.</p>';
    return;
  }

  items.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <div class="product-info">
        <h3>${prod.name}</h3>
        <div class="product-rating">${prod.rating}</div>
        <p class="product-price">$${prod.price.toFixed(2)}</p>
        <div class="card-actions">
          <button class="btn-detail" onclick="openModal(${prod.id})">Ver Más</button>
          <button class="btn-add" onclick="addToCart(${prod.id})">Agregar</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Filtrar por Categoría
function filterCategory(cat, event) {
  if (event) {
    event.preventDefault();
  }
  
  currentCategory = cat;

  // Actualizar botones de filtro activos
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${cat}'`)) {
      btn.classList.add('active');
    }
  });

  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
  renderProducts(filtered);

  // Desplazar suavemente hasta el catálogo
  const catalogSection = document.getElementById('catalog');
  if (catalogSection && event) {
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Búsqueda en Vivo
function handleSearch() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const filtered = products.filter(p => {
    const matchesCat = currentCategory === 'all' || p.category === currentCategory;
    const matchesName = p.name.toLowerCase().includes(query);
    return matchesCat && matchesName;
  });
  renderProducts(filtered);
}

// Lógica de Carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
  toggleCart(true); // Abrir carrito lateral
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotalPrice = document.getElementById('cart-total-price');

  cartItemsContainer.innerHTML = '';
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">El carrito está vacío.</p>';
  } else {
    cart.forEach(item => {
      total += item.price * item.qty;
      count += item.qty;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)} x ${item.qty}</p>
        </div>
        <button onclick="removeFromCart(${item.id})">🗑️</button>
      `;
      cartItemsContainer.appendChild(div);
    });
  }

  cartCount.textContent = count;
  cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function toggleCart(forceOpen = false) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('overlay');
  
  if (forceOpen) {
    drawer.classList.add('open');
    overlay.classList.add('active');
  } else {
    drawer.classList.toggle('open');
    overlay.classList.toggle('active');
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra! Procesando pedido...");
  cart = [];
  updateCart();
  toggleCart();
}

// Modal Detail
function openModal(id) {
  const prod = products.find(p => p.id === id);
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <img src="${prod.image}" style="width:100%; max-height:220px; object-fit:cover; border-radius:8px; margin-bottom:1rem;">
    <h2>${prod.name}</h2>
    <div style="color:#f4a261; margin:0.3rem 0;">${prod.rating}</div>
    <p style="color:var(--accent); font-weight:600; font-size:1.2rem; margin:0.5rem 0;">$${prod.price.toFixed(2)}</p>
    <p style="font-size:0.95rem; color:#444; margin-bottom:1rem;">${prod.description}</p>
    <button class="btn-add" style="width:100%; padding:0.8rem; border-radius:8px;" onclick="addToCart(${prod.id}); closeModal();">Agregar al Carrito</button>
  `;
  document.getElementById('product-modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
}

// Quiz Logic
let quizAnswers = {};

function quizSelect(key, val) {
  quizAnswers[key] = val;
  document.getElementById('step-1').classList.add('hidden');
  document.getElementById('step-2').classList.remove('hidden');
}

function quizFinish(style) {
  quizAnswers['style'] = style;
  document.getElementById('step-2').classList.add('hidden');
  
  const resultDiv = document.getElementById('quiz-result');
  const recItem = document.getElementById('quiz-recommended-item');
  resultDiv.classList.remove('hidden');

  let recProduct = products[0];
  if (quizAnswers.tipo === 'pelo') {
    recProduct = quizAnswers.style === 'natural' ? products[1] : products[3];
  } else {
    recProduct = quizAnswers.style === 'natural' ? products[2] : products[4];
  }

  recItem.innerHTML = `
    <div style="margin-top:1rem; padding:1rem; border:1px solid #ddd; border-radius:8px;">
      <h4>${recProduct.name}</h4>
      <p style="color:var(--accent); font-weight:600; margin:0.3rem 0;">$${recProduct.price.toFixed(2)}</p>
      <button class="btn-add" style="margin-top:0.5rem; padding:0.5rem 1rem; border-radius:6px;" onclick="addToCart(${recProduct.id})">Agregar al Carrito</button>
    </div>
  `;
}

// Newsletter Subscription
function subscribeNewsletter(event) {
  event.preventDefault();
  alert("¡Gracias por suscribirte! Te hemos enviado tu cupón del 15% de descuento.");
  event.target.reset();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});