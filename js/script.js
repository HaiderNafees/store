// Get products from localStorage or use default sample data
function getProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        return JSON.parse(savedProducts);
    }
    
    // Comprehensive product catalog from basic to advanced
    return [
        // BASIC FRUITS
        {
            id: 1,
            name: 'Fresh Apples',
            price: 2.99,
            image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Fruits',
            description: 'Fresh and juicy apples from local farms',
            stock: 50
        },
        {
            id: 2,
            name: 'Fresh Bananas',
            price: 1.99,
            image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Fruits',
            description: 'Ripe and sweet bananas',
            stock: 100
        },
        {
            id: 3,
            name: 'Fresh Carrots',
            price: 1.29,
            image: 'https://images.unsplash.com/photo-1445282768819-7a5f5cf12f8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Vegetables',
            description: 'Crunchy and fresh carrots',
            stock: 75
        },
        {
            id: 4,
            name: 'Fresh Tomatoes',
            price: 2.49,
            image: 'https://images.unsplash.com/photo-1546470427-e92b2c9c09d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Vegetables',
            description: 'Juicy red tomatoes',
            stock: 60
        },
        {
            id: 5,
            name: 'Whole Milk',
            price: 3.99,
            image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Dairy',
            description: 'Fresh whole milk',
            stock: 40
        },
        {
            id: 6,
            name: 'Farm Eggs',
            price: 4.99,
            image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Dairy',
            description: 'Fresh farm eggs',
            stock: 30
        },
        {
            id: 7,
            name: 'Fresh Bread',
            price: 2.99,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Bakery',
            description: 'Freshly baked bread',
            stock: 25
        },
        {
            id: 8,
            name: 'Fresh Oranges',
            price: 3.49,
            image: 'https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Fruits',
            description: 'Sweet and juicy oranges',
            stock: 80,
            level: 'basic'
        },
        
        // MORE BASIC PRODUCTS
        {
            id: 9,
            name: 'Strawberries',
            price: 4.99,
            image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Fruits',
            description: 'Fresh sweet strawberries',
            stock: 40,
            level: 'basic'
        },
        {
            id: 10,
            name: 'Fresh Broccoli',
            price: 2.99,
            image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4b4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Vegetables',
            description: 'Fresh green broccoli',
            stock: 45,
            level: 'basic'
        },
        {
            id: 11,
            name: 'Fresh Spinach',
            price: 2.49,
            image: 'https://images.unsplash.com/photo-1576092768245-de5d5b5be534?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Vegetables',
            description: 'Fresh leafy spinach',
            stock: 55,
            level: 'basic'
        },
        {
            id: 12,
            name: 'Greek Yogurt',
            price: 4.49,
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Dairy',
            description: 'Creamy Greek yogurt',
            stock: 35,
            level: 'basic'
        },
        {
            id: 13,
            name: 'Cheddar Cheese',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1486477351936-5dc2f032ae1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Dairy',
            description: 'Aged cheddar cheese',
            stock: 30,
            level: 'basic'
        },
        {
            id: 14,
            name: 'Fresh Chicken',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1546823312-2d5b5b8c2e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Meat',
            description: 'Fresh chicken breast',
            stock: 25,
            level: 'basic'
        },
        {
            id: 15,
            name: 'Ground Beef',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1568901346403-6df4166c22a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Meat',
            description: 'Premium ground beef',
            stock: 20,
            level: 'basic'
        },
        
        // INTERMEDIATE PRODUCTS
        {
            id: 16,
            name: 'Organic Avocados',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Fruits',
            description: 'Organic ripe avocados',
            stock: 30,
            level: 'intermediate'
        },
        {
            id: 17,
            name: 'Fresh Pineapple',
            price: 5.49,
            image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Fruits',
            description: 'Sweet tropical pineapple',
            stock: 25,
            level: 'intermediate'
        },
        {
            id: 18,
            name: 'Bell Peppers',
            price: 3.99,
            image: 'https://images.unsplash.com/photo-1583221581544-9b38be1c5720?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Vegetables',
            description: 'Colorful bell peppers',
            stock: 35,
            level: 'intermediate'
        },
        {
            id: 19,
            name: 'Mushrooms',
            price: 4.49,
            image: 'https://images.unsplash.com/photo-1518448079867-6c78c5f08dab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Vegetables',
            description: 'Fresh button mushrooms',
            stock: 30,
            level: 'intermediate'
        },
        {
            id: 20,
            name: 'Artisan Bread',
            price: 4.99,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Bakery',
            description: 'Fresh artisan bread',
            stock: 20,
            level: 'intermediate'
        },
        {
            id: 21,
            name: 'Fresh Salmon',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1467003909585-2f572745b742?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Seafood',
            description: 'Fresh Atlantic salmon',
            stock: 15,
            level: 'intermediate'
        },
        {
            id: 22,
            name: 'Olive Oil',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1528304938864-0b8663a4a9a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Pantry',
            description: 'Extra virgin olive oil',
            stock: 25,
            level: 'intermediate'
        },
        
        // ADVANCED PRODUCTS
        {
            id: 23,
            name: 'Organic Quinoa',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Grains',
            description: 'Organic quinoa grains',
            stock: 20,
            level: 'advanced'
        },
        {
            id: 24,
            name: 'Kale',
            price: 4.99,
            image: 'https://images.unsplash.com/photo-1576092768245-de5d5b5be534?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Vegetables',
            description: 'Fresh organic kale',
            stock: 25,
            level: 'advanced'
        },
        {
            id: 25,
            name: 'Chia Seeds',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1525373612132-b3e820b87cea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Pantry',
            description: 'Organic chia seeds',
            stock: 30,
            level: 'advanced'
        },
        {
            id: 26,
            name: 'Almond Milk',
            price: 5.49,
            image: 'https://images.unsplash.com/photo-1589654315991-34e622355b98?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Dairy',
            description: 'Unsweetened almond milk',
            stock: 35,
            level: 'advanced'
        },
        {
            id: 27,
            name: 'Wagyu Beef',
            price: 45.99,
            image: 'https://images.unsplash.com/photo-1625869016801-72c5c7ce4475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Meat',
            description: 'Premium Wagyu beef',
            stock: 8,
            level: 'advanced'
        },
        {
            id: 28,
            name: 'Lobster',
            price: 35.99,
            image: 'https://images.unsplash.com/photo-1568901346403-6df4166c22a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Seafood',
            description: 'Fresh Maine lobster',
            stock: 10,
            level: 'advanced'
        },
        
        // PREMIUM PRODUCTS
        {
            id: 29,
            name: 'Truffle Oil',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1528304938864-0b8663a4a9a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Pantry',
            description: 'Premium truffle oil',
            stock: 15,
            level: 'premium'
        },
        {
            id: 30,
            name: 'Saffron',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Spices',
            description: 'Premium saffron threads',
            stock: 8,
            level: 'premium'
        },
        {
            id: 31,
            name: 'Foie Gras',
            price: 65.99,
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Meat',
            description: 'Premium duck foie gras',
            stock: 5,
            level: 'premium'
        },
        {
            id: 32,
            name: 'Caviar',
            price: 125.99,
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Seafood',
            description: 'Premium black caviar',
            stock: 3,
            level: 'premium'
        }
    ];
}

let products = getProducts();

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartCount = document.querySelector('.cart-count');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const searchInput = document.querySelector('.search-box input');

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// Initialize the app
function init() {
    // Force refresh products from our comprehensive catalog
    localStorage.removeItem('products');
    products = getProducts();
    
    // Initial display
    displayProducts(getFilteredProducts());
    setupEventListeners();
    updateCartCount();
    renderCart();
    
    // Setup product filter
    setupProductFilter();
    
    console.log('Loaded', products.length, 'products');
    
    // Store the last update time to prevent rapid refreshes
    let lastUpdateTime = 0;
    const updateCooldown = 500; // 500ms cooldown between updates

    // Listen for product updates from admin
    window.addEventListener('productsUpdated', () => {
        const now = Date.now();
        if (now - lastUpdateTime < updateCooldown) return; // Skip if updates are too frequent
        lastUpdateTime = now;
        
        const previousProductCount = products.length;
        products = getProducts();
        
        // Only update if products actually changed
        if (JSON.stringify(products) !== JSON.stringify(getProducts())) {
            displayProducts(getFilteredProducts());
            
            // If cart contains products that no longer exist, remove them
            let cartUpdated = false;
            cart = cart.filter(item => {
                const productExists = products.some(p => p.id === item.id);
                if (!productExists) cartUpdated = true;
                return productExists;
            });
            
            if (cartUpdated) {
                saveCart();
                updateCartCount();
                renderCart();
            }
        }
    }, { passive: true }); // Mark as passive for better performance
}

// Setup product filter functionality
function setupProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Set current filter and display products
            currentFilter = button.getAttribute('data-level');
            displayProducts(getFilteredProducts());
        });
    });
}

// Get filtered products based on current filter
function getFilteredProducts() {
    if (currentFilter === 'all') {
        return products;
    }
    
    return products.filter(product => product.level === currentFilter);
}

// Display products in the grid with optimized rendering
function displayProducts(productsToDisplay) {
    if (!productGrid) return;
    
    // Store current scroll position
    const scrollPosition = window.scrollY;
    
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
        // Get existing product elements
        const existingProducts = new Map();
        productGrid.querySelectorAll('.product-card').forEach(card => {
            const id = card.getAttribute('data-id');
            if (id) existingProducts.set(id, card);
        });
        
        // Filter out products with stock <= 0
        const availableProducts = (productsToDisplay || []).filter(p => p.stock > 0);
        
        // Create a document fragment for new products
        const fragment = document.createDocumentFragment();
        let hasUpdates = false;
        
        // Process each product
        availableProducts.forEach(product => {
            const productId = String(product.id);
            const existingCard = existingProducts.get(productId);
            
            if (!existingCard) {
                // Create new product card
                const productCard = createProductCard(product);
                fragment.appendChild(productCard);
                hasUpdates = true;
            } else {
                // Update existing card if needed
                if (updateProductCard(existingCard, product)) {
                    hasUpdates = true;
                }
                existingProducts.delete(productId);
            }
        });
        
        // Remove products that are no longer available
        existingProducts.forEach(card => {
            card.classList.add('removing');
            setTimeout(() => card.remove(), 300);
            hasUpdates = true;
        });
        
        // Add new products if any
        if (fragment.hasChildNodes()) {
            productGrid.appendChild(fragment);
        }
        
        // Show message if no products
        if (availableProducts.length === 0) {
            productGrid.innerHTML = '<p class="no-products">No products available. Please check back later.</p>';
        } else if (productGrid.querySelector('.no-products') && fragment.hasChildNodes()) {
            productGrid.innerHTML = '';
            productGrid.appendChild(fragment);
        }
        
        // Mark grid as loaded for CSS transitions
        if (!productGrid.classList.contains('loaded')) {
            setTimeout(() => productGrid.classList.add('loaded'), 0);
        }
        
        // Restore scroll position
        if (hasUpdates) {
            window.scrollTo(0, scrollPosition);
        }
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    
    const stockClass = product.stock <= 10 ? 'low' : '';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <span class="product-level ${product.level}">${product.level}</span>
            <h3 class="product-title">${product.name}</h3>
            <span class="product-category">${product.category}</span>
            <p class="product-description">${product.description}</p>
            <div class="product-stock ${stockClass}">${product.stock} in stock</div>
            <div class="product-price">${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    
    return card;
}

// Update an existing product card if needed
function updateProductCard(card, product) {
    let hasChanges = false;
    
    // Update stock status
    const stockElement = card.querySelector('.product-stock');
    if (stockElement) {
        const newStockClass = product.stock <= 10 ? 'low' : '';
        const newStockText = `${product.stock} in stock`;
        
        if (stockElement.className !== `product-stock ${newStockClass}`.trim() || 
            stockElement.textContent !== newStockText) {
            stockElement.className = `product-stock ${newStockClass}`.trim();
            stockElement.textContent = newStockText;
            hasChanges = true;
        }
    }
    
    // Update add to cart button
    const addToCartBtn = card.querySelector('.add-to-cart');
    if (addToCartBtn) {
        const isOutOfStock = product.stock <= 0;
        const buttonText = isOutOfStock ? 'Out of Stock' : 'Add to Cart';
        
        if (addToCartBtn.disabled !== isOutOfStock || 
            addToCartBtn.textContent !== buttonText) {
            addToCartBtn.disabled = isOutOfStock;
            addToCartBtn.textContent = buttonText;
            hasChanges = true;
        }
    }
    
    return hasChanges;
}

// Add to cart functionality
function addToCart(productId) {
    if (typeof productId === 'object') {
        // Handle event object
        if (!productId.target.classList.contains('add-to-cart')) return;
        productId = parseInt(productId.target.getAttribute('data-id'));
    } else {
        // Handle direct ID call
        productId = parseInt(productId);
    }
    
    const product = products.find(p => p.id === productId);
    
    if (!product || product.stock <= 0) {
        showNotification('This product is out of stock', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    // Check if adding this item would exceed available stock
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showNotification(`Only ${product.stock} ${product.name} available in stock`, 'error');
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    renderCart();
    showNotification(`${product.name} added to cart!`);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Render cart items
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="#featured" class="cta-button">Continue Shopping</a>
            </div>
        `;
        cartSubtotal.textContent = '$0.00';
        checkoutBtn.disabled = true;
        return;
    }
    
    let itemsHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    checkoutBtn.disabled = false;
    
    // Add event listeners to quantity buttons and remove buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', handleQuantityChange);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}

// Handle quantity changes
function handleQuantityChange(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    if (e.target.classList.contains('plus')) {
        item.quantity++;
    } else if (e.target.classList.contains('minus')) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            // If quantity would be 0, remove the item
            cart = cart.filter(item => item.id !== productId);
        }
    }
    
    saveCart();
    updateCartCount();
    renderCart();
}

// Remove item from cart
function removeFromCart(e) {
    const productId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    
    saveCart();
    updateCartCount();
    renderCart();
    
    // Show notification
    const product = products.find(p => p.id === productId);
    if (product) {
        showNotification(`${product.name} removed from cart`);
    }
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('show');
    
    // Render cart when opening
    if (modal.classList.contains('show')) {
        renderCart();
    }
}

// Close modal when clicking outside
function closeModal(e) {
    const modal = document.getElementById('cartModal');
    if (e.target === modal) {
        modal.classList.remove('show');
    }
}

// Update cart count in the header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add animation when count changes
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
        cartCount.classList.add('bounce');
        setTimeout(() => {
            cartCount.classList.remove('bounce');
        }, 300);
    } else {
        cartCount.style.display = 'none';
    }
}

// Show notification
function showNotification(message) {
    // Check if notification already exists
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Search functionality
function searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        document.querySelector('.mobile-menu')?.classList.toggle('active');
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && !e.target.closest('.mobile-menu')) {
            hamburger.classList.remove('active');
            document.querySelector('.mobile-menu')?.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hamburger.classList.remove('active');
                document.querySelector('.mobile-menu')?.classList.remove('active');
            }
        });
    });
    
    // Cart icon click
    document.querySelector('.cart-icon').addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    });
    
    // Close modal when clicking X
    document.querySelector('.close')?.addEventListener('click', toggleCart);
    
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('cartModal');
        if (e.target === modal) {
            toggleCart();
        }
    });
    
    // Checkout button
    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
        // In a real app, you would redirect to checkout
        alert('Proceeding to checkout!');
    });
    
    // Create mobile menu for small screens
    createMobileMenu();
}

// Create mobile menu for small screens
function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const menuItem = document.createElement('a');
        menuItem.href = link.href;
        menuItem.textContent = link.textContent;
        if (link.classList.contains('active')) {
            menuItem.classList.add('active');
        }
        mobileMenu.appendChild(menuItem);
    });
    
    document.body.appendChild(mobileMenu);
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure all styles are loaded
    setTimeout(() => {
        init();
    }, 50);
});

// Add some CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background-color: #4CAF50;
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transition: transform 0.3s ease-in-out;
    }
    
    .notification.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .bounce {
        animation: bounce 0.5s;
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 2rem;
        font-size: 1.2rem;
        color: var(--light-text);
    }
`;
document.head.appendChild(style);

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navLinks.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
});
