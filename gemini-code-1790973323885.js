// Banco de dados simulado de produtos
const products = [
    { id: 1, name: "Jaqueta de Couro Vintage", price: 299.90, category: "masculino", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Vestido Floral Verão", price: 149.90, category: "feminino", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Camiseta Básica Algodão", price: 69.90, category: "masculino", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Calça Jeans Slim Fit", price: 189.90, category: "feminino", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Boné Dad Hat Minimalista", price: 49.90, category: "acessorios", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Moletom Oversized Preto", price: 219.90, category: "masculino", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80" }
];

let cart = [];

// Elementos do DOM
const productGrid = document.getElementById('productGrid');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

// Renderizar Produtos
function displayProducts(productsToDisplay) {
    productGrid.innerHTML = "";
    if (productsToDisplay.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">Nenhum produto encontrado.</p>`;
        return;
    }

    productsToDisplay.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <button class="add-cart-btn" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Adicionar ao Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    openCartSidebar();
}

// Atualizar Carrinho
function updateCart() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Remover item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Abrir/Fechar Carrinho Lateral
function openCartSidebar() {
    cartSidebar.classList.add('open');
}

cartIcon.addEventListener('click', openCartSidebar);
closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Filtrar por Categoria
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.getAttribute('data-filter');
        if (filter === 'all') {
            displayProducts(products);
        } else {
            const filtered = products.filter(p => p.category === filter);
            displayProducts(filtered);
        }
    });
});

// Pesquisa em Tempo Real
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const searched = products.filter(p => p.name.toLowerCase().includes(term));
    displayProducts(searched);
});

// Finalizar Compra
function finalizarCompra() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra finalizada com sucesso! Obrigado por comprar na Stilo Urbano.");
    cart = [];
    updateCart();
    cartSidebar.classList.remove('open');
}

// Inicializar a loja exibindo todos os produtos
displayProducts(products);