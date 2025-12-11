// Admin Panel Functionality

// Function to dispatch product update event
function dispatchProductUpdate() {
    const event = new CustomEvent('productsUpdated');
    window.dispatchEvent(event);
}

// Utility function to limit rapid function calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Helper function to create a new product row
function createProductRow(product) {
    const row = document.createElement('tr');
    row.setAttribute('data-product-id', product.id);
    
    // Create a placeholder div for the image
    const imgPlaceholder = document.createElement('div');
    imgPlaceholder.className = 'image-placeholder';
    
    // Create the row with a placeholder first
    row.innerHTML = `
        <td>${imgPlaceholder.outerHTML}</td>
        <td>${product.name}</td>
        <td>${product.category || 'Uncategorized'}</td>
        <td>$${parseFloat(product.price).toFixed(2)}</td>
        <td class="stock-cell ${product.stock < 10 ? 'low-stock' : ''}">
            ${product.stock} ${product.stock < 10 ? '<i class="fas fa-exclamation-circle" title="Low stock"></i>' : ''}
        </td>
        <td class="actions">
            <button class="btn-icon edit-product" data-id="${product.id}" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon delete-product" data-id="${product.id}" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    // After the row is created, handle the image loading
    const imgContainer = row.querySelector('td:first-child');
    const img = new Image();
    img.className = 'product-thumb';
    img.alt = product.name;
    
    // Set up error handling
    img.onerror = function() {
        this.src = 'images/no-image.png';
    };
    
    // When image is loaded, replace the placeholder
    img.onload = function() {
        imgContainer.innerHTML = '';
        imgContainer.appendChild(img);
    };
    
    // Start loading the image
    img.src = product.image || 'images/no-image.png';
    
    return row;
}

// Helper function to update an existing product row
function updateProductRow(row, product) {
    const cells = row.cells;
    let hasChanges = false;

    // Update image if changed - only update if the URL is different
    const img = cells[0].querySelector('img');
    const newImage = (product.image || 'images/no-image.png').split('?')[0]; // Remove any cache-busting query params
    const currentImage = img.src.split('?')[0];
    
    if (currentImage !== newImage) {
        // Add a small delay to let the browser handle the image load
        setTimeout(() => {
            // Create a new image element to preload
            const newImg = new Image();
            newImg.onload = function() {
                // Only update the source when the new image is loaded
                img.src = newImage;
            };
            newImg.src = newImage;
        }, 0);
        hasChanges = true;
    }

    // Update name if changed
    if (cells[1].textContent !== product.name) {
        cells[1].textContent = product.name;
        hasChanges = true;
    }

    // Update category if changed
    const category = product.category || 'Uncategorized';
    if (cells[2].textContent !== category) {
        cells[2].textContent = category;
        hasChanges = true;
    }

    // Update price if changed
    const priceText = `$${parseFloat(product.price).toFixed(2)}`;
    if (cells[3].textContent !== priceText) {
        cells[3].textContent = priceText;
        hasChanges = true;
    }

    // Update stock if changed
    const stockCell = cells[4];
    const newStockClass = product.stock < 10 ? 'low-stock' : '';
    if (stockCell.className !== `stock-cell ${newStockClass}`.trim()) {
        stockCell.className = `stock-cell ${newStockClass}`.trim();
        stockCell.innerHTML = `${product.stock} ${product.stock < 10 ? '<i class="fas fa-exclamation-circle" title="Low stock"></i>' : ''}`;
        hasChanges = true;
    }

    return hasChanges;
}

// Helper function to attach event listeners to product actions
function attachProductEventListeners() {
    // Edit product buttons
    document.querySelectorAll('.edit-product').forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', (e) => {
            const productId = parseInt(newButton.getAttribute('data-id'));
            editProduct(productId);
        });
    });

    // Delete product buttons
    document.querySelectorAll('.delete-product').forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', (e) => {
            const productId = parseInt(newButton.getAttribute('data-id'));
            confirmDelete('product', productId, 'Are you sure you want to delete this product?');
        });
    });
}

// Debug log when the script loads
console.log('Admin JS loaded');

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.admin-sidebar');
const contentSections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.sidebar-nav a[data-section]');
const logoutBtn = document.getElementById('logoutBtn');

// Debug log elements
console.log('Menu Toggle:', menuToggle);
console.log('Sidebar:', sidebar);
console.log('Content Sections:', contentSections);
console.log('Nav Links:', navLinks);
console.log('Logout Button:', logoutBtn);

// Sample data (in a real app, this would come from a backend API)
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: 'Fresh Apples', category: 'Fruits', price: 2.99, stock: 50, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Fresh and juicy apples from local farms' },
    { id: 2, name: 'Fresh Bananas', category: 'Fruits', price: 1.99, stock: 100, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Ripe and sweet bananas' },
    { id: 3, name: 'Fresh Carrots', category: 'Vegetables', price: 1.29, stock: 75, image: 'https://images.unsplash.com/photo-1445282768819-7a5f5cf12f8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Crunchy and fresh carrots' },
    { id: 4, name: 'Fresh Tomatoes', category: 'Vegetables', price: 2.49, stock: 60, image: 'https://images.unsplash.com/photo-1546470427-e92b2c9c09d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Juicy red tomatoes' },
    { id: 5, name: 'Whole Milk', category: 'Dairy', price: 3.99, stock: 40, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Fresh whole milk' },
    { id: 6, name: 'Farm Eggs', category: 'Dairy', price: 4.99, stock: 30, image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Fresh farm eggs' },
    { id: 7, name: 'Fresh Bread', category: 'Bakery', price: 2.99, stock: 25, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Freshly baked bread' },
    { id: 8, name: 'Fresh Oranges', category: 'Fruits', price: 3.49, stock: 80, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Sweet and juicy oranges' }
];

let categories = JSON.parse(localStorage.getItem('categories')) || [
    { id: 1, name: 'Fruits', description: 'Fresh fruits', image: 'images/fruits.jpg' },
    { id: 2, name: 'Vegetables', description: 'Fresh vegetables', image: 'images/vegetables.jpg' },
    { id: 3, name: 'Dairy', description: 'Dairy products', image: 'images/dairy.jpg' },
    { id: 4, name: 'Bakery', description: 'Fresh bakery items', image: 'images/bakery.jpg' }
];

// Setup automatic synchronization from homepage
function setupAutoSync() {
    // Listen for changes from homepage (productsUpdated event)
    window.addEventListener('productsUpdated', () => {
        console.log('Received productsUpdated event from homepage');
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            const newProducts = JSON.parse(savedProducts);
            if (JSON.stringify(newProducts) !== JSON.stringify(products)) {
                products = newProducts;
                console.log('Auto-synced products from homepage:', products.length, 'products');
                
                // If we're on the products section, refresh the display
                if (document.querySelector('#products-section.active')) {
                    loadProducts();
                }
                
                // Refresh dashboard stats if on dashboard
                if (document.querySelector('#dashboard-section.active')) {
                    loadDashboard();
                }
                
                showNotification('Products automatically synced from homepage', 'success');
            }
        }
    });
    
    // Also listen for storage changes (in case homepage is open in another tab)
    window.addEventListener('storage', (e) => {
        if (e.key === 'products') {
            console.log('Storage change detected for products');
            const savedProducts = localStorage.getItem('products');
            if (savedProducts) {
                products = JSON.parse(savedProducts);
                console.log('Auto-synced products from storage change:', products.length, 'products');
                
                // If we're on the products section, refresh the display
                if (document.querySelector('#products-section.active')) {
                    loadProducts();
                }
                
                // Refresh dashboard stats if on dashboard
                if (document.querySelector('#dashboard-section.active')) {
                    loadDashboard();
                }
                
                showNotification('Products automatically synced from homepage', 'success');
            }
        }
    });
    
    console.log('Automatic synchronization setup complete');
}

// Initialize the admin panel
function initAdminPanel() {
    console.log('Initializing admin panel...');
    
    try {
        // Create overlay for mobile menu
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        
        // Close sidebar when clicking overlay
        overlay.addEventListener('click', () => {
            document.body.classList.add('sidebar-collapsed');
            const sidebar = document.querySelector('.admin-sidebar');
            const mainContent = document.querySelector('.admin-main');
            if (sidebar) sidebar.classList.add('collapsed');
            if (mainContent) mainContent.classList.add('expanded');
            overlay.classList.remove('show');
        });
        
        // Load saved sidebar state
        const isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isSidebarCollapsed) {
            document.body.classList.add('sidebar-collapsed');
            const sidebar = document.querySelector('.admin-sidebar');
            const mainContent = document.querySelector('.admin-main');
            if (sidebar) sidebar.classList.add('collapsed');
            if (mainContent) mainContent.classList.add('expanded');
        }
        
        // Save initial data if not exists
        if (!localStorage.getItem('products')) {
            console.log('No products in localStorage, initializing with default products');
            localStorage.setItem('products', JSON.stringify(products));
        } else {
            const savedProducts = localStorage.getItem('products');
            if (savedProducts) {
                products = JSON.parse(savedProducts);
                console.log('Loaded products from localStorage:', products.length, 'products');
            }
        }
        
        // Set up automatic synchronization from homepage
        setupAutoSync();
        
        if (!localStorage.getItem('categories')) {
            localStorage.setItem('categories', JSON.stringify(categories));
        } else {
            const savedCategories = localStorage.getItem('categories');
            if (savedCategories) {
                categories = JSON.parse(savedCategories);
                console.log('Loaded categories from localStorage:', categories.length, 'categories');
            }
        }
        
        // Handle hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.replace('#', '') || 'dashboard';
            // Remove any existing -section to prevent duplication
            const cleanHash = hash.replace('-section', '');
            showSection(cleanHash);
        });
        
        // Set active section based on URL hash or default to dashboard
        const hash = window.location.hash.replace('#', '');
        const defaultSection = 'dashboard';
        let activeSection = defaultSection;
        
        if (hash) {
            // Remove any existing -section to prevent duplication
            activeSection = hash.replace('-section', '');
        }
        
        // Update URL to include the correct hash with -section
        if (activeSection !== 'dashboard') {
            window.location.hash = `${activeSection}-section`;
        } else {
            window.location.hash = '';
        }
        
        // Show the active section
        showSection(activeSection);
        
        // If we're starting on the products section, ensure products are loaded
        if (activeSection === 'products') {
            loadProducts();
        }
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('Admin panel initialized successfully');
    } catch (error) {
        console.error('Error initializing admin panel:', error);
        showNotification('Error initializing admin panel. Please refresh the page.', 'error');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPanel);
} else {
    initAdminPanel();
}

// Setup event listeners
function setupEventListeners() {
    // Toggle sidebar
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
            const sidebar = document.querySelector('.admin-sidebar');
            const mainContent = document.querySelector('.admin-main');
            const overlay = document.querySelector('.sidebar-overlay');
            
            if (sidebar) {
                sidebar.classList.toggle('collapsed', isCollapsed);
            }
            if (mainContent) {
                mainContent.classList.toggle('expanded', isCollapsed);
            }
            
            // Toggle overlay for mobile
            if (window.innerWidth <= 992) {
                if (isCollapsed) {
                    overlay.classList.remove('show');
                } else {
                    overlay.classList.add('show');
                }
            }
            
            // Save sidebar state
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });
    }
    
    // Navigation links
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                let section = link.getAttribute('data-section');
                if (section) {
                    // Remove any existing -section to prevent duplication
                    section = section.replace('-section', '');
                    
                    // Update active state
                    navLinks.forEach(navLink => {
                        if (navLink.parentElement) {
                            navLink.parentElement.classList.remove('active');
                        }
                    });
                    if (link.parentElement) {
                        link.parentElement.classList.add('active');
                    }
                    
                    // Update URL with the correct section ID
                    if (section === 'dashboard') {
                        window.location.hash = '';
                    } else {
                        window.location.hash = `${section}-section`;
                    }
                    
                    // Show the section
                    showSection(section);
                    
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth <= 992) {
                        document.body.classList.add('sidebar-collapsed');
                        const sidebar = document.querySelector('.admin-sidebar');
                        const mainContent = document.querySelector('.admin-main');
                        const overlay = document.querySelector('.sidebar-overlay');
                        if (sidebar) sidebar.classList.add('collapsed');
                        if (mainContent) mainContent.classList.add('expanded');
                        if (overlay) overlay.classList.remove('show');
                    }
                }
            });
        });
    }
    
    // Logout buttons
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
    
    // Product form submission
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
    
    // Add product button
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => openProductModal());
    }
    
    // Refresh products button
    const refreshProductsBtn = document.getElementById('refreshProductsBtn');
    if (refreshProductsBtn) {
        refreshProductsBtn.addEventListener('click', () => {
            // Force refresh from localStorage
            const savedProducts = localStorage.getItem('products');
            if (savedProducts) {
                products = JSON.parse(savedProducts);
            }
            loadProducts();
            showNotification('Products refreshed successfully', 'success');
        });
    }
    
    // Image preview
    const productImageInput = document.getElementById('productImage');
    if (productImageInput) {
        productImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const imagePreview = document.getElementById('imagePreview');
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-image">`;
                };
                reader.readAsDataURL(file);
            } else {
                imagePreview.innerHTML = '<div class="no-image">No image selected</div>';
            }
        });
    }
    
    // Modal close buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close') || e.target.classList.contains('btn-secondary')) {
            closeAllModals();
        }
    });
    
    // Event delegation for dynamic elements
    document.addEventListener('click', (e) => {
        // Handle delete product
        if (e.target.closest('.delete-product')) {
            e.stopPropagation();
            const btn = e.target.closest('.delete-product');
            const productId = parseInt(btn.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                if (confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
                    deleteProduct(productId);
                }
            } else {
                showNotification('Product not found', 'error');
            }
        }
        
        // Handle edit product
        else if (e.target.closest('.edit-product')) {
            e.stopPropagation();
            const btn = e.target.closest('.edit-product');
            const productId = parseInt(btn.getAttribute('data-id'));
            editProduct(productId);
        }
        
        // Handle delete category
        else if (e.target.closest('.delete-category')) {
            const btn = e.target.closest('.delete-category');
            const categoryId = parseInt(btn.getAttribute('data-id'));
            const category = categories.find(c => c.id === categoryId);
            if (category) {
                if (confirm(`Are you sure you want to delete the category "${category.name}"? This will also remove all products in this category.`)) {
                    deleteCategory(categoryId);
                }
            }
        }
        
        // Handle edit category
        else if (e.target.closest('.edit-category')) {
            const btn = e.target.closest('.edit-category');
            const categoryId = parseInt(btn.getAttribute('data-id'));
            editCategory(categoryId);
        }
    });
}

// Show section
function showSection(sectionId) {
    // Get the target section (remove any existing -section to prevent duplication)
    const cleanSectionId = sectionId.replace('-section', '');
    const targetSection = document.getElementById(`${cleanSectionId}-section`);
    if (!targetSection) return;

    // Get the currently active section
    const currentSection = document.querySelector('.content-section.active');
    
    // If clicking the same section, just ensure content is loaded
    if (currentSection && currentSection === targetSection) {
        loadSectionContent(cleanSectionId);
        return;
    }
    
    // Fade out current section if exists
    if (currentSection) {
        currentSection.style.opacity = '0';
        setTimeout(() => {
            currentSection.classList.remove('active');
            currentSection.style.opacity = '1';
            
            // After fade out completes, show new section
            showNewSection(targetSection, cleanSectionId);
        }, 150);
    } else {
        // If no current section, show new section immediately
        showNewSection(targetSection, cleanSectionId);
    }
}

// Helper function to show a new section
function showNewSection(sectionElement, sectionId) {
    // Show the new section
    sectionElement.style.opacity = '0';
    sectionElement.classList.add('active');
    
    // Force reflow to ensure the transition works
    void sectionElement.offsetHeight;
    
    // Fade in the new section
    setTimeout(() => {
        sectionElement.style.transition = 'opacity 0.3s ease-in';
        sectionElement.style.opacity = '1';
        
        // Load section content
        loadSectionContent(sectionId);
        
        // Remove transition after animation completes
        setTimeout(() => {
            sectionElement.style.transition = '';
        }, 300);
    }, 10);
    
    // Ensure content is scrolled to top
    sectionElement.scrollTop = 0;
}

// Helper function to load section content
function loadSectionContent(sectionId) {
    if (sectionId === 'products') {
        loadProducts();
    } else if (sectionId === 'dashboard') {
        loadDashboard();
    } else if (sectionId === 'categories') {
        loadCategories();
    }
}

// Show section
function showSection(sectionId) {
    // Get the target section (remove any existing -section to prevent duplication)
    const cleanSectionId = sectionId.replace('-section', '');
    const targetSection = document.getElementById(`${cleanSectionId}-section`);
    if (!targetSection) return;

    // Get the currently active section
    const currentSection = document.querySelector('.content-section.active');
    
    // If clicking the same section, just ensure content is loaded
    if (currentSection && currentSection === targetSection) {
        loadSectionContent(cleanSectionId);
        return;
    }
    
    // Fade out current section if exists
    if (currentSection) {
        currentSection.style.opacity = '0';
        setTimeout(() => {
            currentSection.classList.remove('active');
            currentSection.style.opacity = '1';
            
            // After fade out completes, show new section
            showNewSection(targetSection, cleanSectionId);
        }, 150);
    } else {
        // If no current section, show new section immediately
        showNewSection(targetSection, cleanSectionId);
    }
    
    // Update active nav item
    const navItems = document.querySelectorAll('.sidebar-nav li');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('data-section') === cleanSectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Update page title with animation
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        pageTitle.style.opacity = '0';
        setTimeout(() => {
            pageTitle.textContent = cleanSectionId.charAt(0).toUpperCase() + cleanSectionId.slice(1);
            pageTitle.style.transition = 'opacity 0.2s ease-in';
            pageTitle.style.opacity = '1';
            
            // Remove the transition after it's done
            setTimeout(() => {
                pageTitle.style.transition = '';
            }, 200);
        }, 100);
    }
    
    // Load section-specific content immediately for better responsiveness
    try {
        switch (cleanSectionId) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'products':
                // Force refresh from localStorage and load products immediately
                const savedProducts = localStorage.getItem('products');
                if (savedProducts) {
                    products = JSON.parse(savedProducts);
                    console.log('Products section: Refreshed from localStorage, found', products.length, 'products');
                }
                loadProducts();
                break;
            case 'categories':
                loadCategories();
                break;
            case 'orders':
                // loadOrders(); // Uncomment if you have this function
                break;
        }
    } catch (error) {
        console.error(`Error loading section ${cleanSectionId}:`, error);
    }
    
    // Close any open modals when switching sections
    closeAllModals();
}

// Load dashboard data
function loadDashboard() {
    // Only update if we're on the dashboard
    if (window.location.hash !== '#dashboard' && window.location.hash !== '') {
        return;
    }
    
    const updateStats = () => {
        const totalProductsEl = document.getElementById('totalProducts');
        const totalCategoriesEl = document.getElementById('totalCategories');
        
        if (totalProductsEl) totalProductsEl.textContent = products.length;
        if (totalCategoriesEl) totalCategoriesEl.textContent = categories.length;
    };
    
    // Update immediately and then debounce further updates
    updateStats();
    window.debouncedUpdateStats = window.debouncedUpdateStats || debounce(updateStats, 300);
}

// Load products with optimized rendering
function loadProducts() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) {
        console.log('productsTableBody not found');
        return;
    }

    // Always refresh products from localStorage to ensure we have the latest data
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        console.log('Refreshed products from localStorage:', products.length, 'products');
        console.log('Products data:', products);
    } else {
        console.log('No products found in localStorage');
        products = [];
    }

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
        // Store current scroll position
        const scrollPosition = tbody.scrollTop;

        // Get existing product rows
        const existingRows = Array.from(tbody.querySelectorAll('tr[data-product-id]'));
        const existingProductIds = new Map();
        
        // Create a map of existing rows for faster lookup
        existingRows.forEach(row => {
            const productId = row.getAttribute('data-product-id');
            existingProductIds.set(productId, row);
        });

        // Create a set of current product IDs for quick lookup
        const currentProductIds = new Set(products.map(p => p.id.toString()));

        // Create a document fragment for new rows
        const fragment = document.createDocumentFragment();
        let hasUpdates = false;

        // Process each product
        products.forEach(product => {
            const productId = product.id.toString();
            let row = existingProductIds.get(productId);
            
            if (!row) {
                // Create new row for new product
                row = createProductRow(product);
                fragment.appendChild(row);
                hasUpdates = true;
            } else {
                // Update existing row if needed
                if (updateProductRow(row, product)) {
                    hasUpdates = true;
                }
                // Remove from map to track which rows need to be removed
                existingProductIds.delete(productId);
            }
        });

        // Remove rows for products that no longer exist
        existingProductIds.forEach((row, productId) => {
            row.classList.add('fade-out');
            setTimeout(() => row.remove(), 200); // Wait for fade-out animation
            hasUpdates = true;
        });

        // Add new rows if any
        if (fragment.hasChildNodes()) {
            tbody.appendChild(fragment);
        }

        // Show message if no products
        if (products.length === 0) {
            console.log('No products to display, showing empty message');
            tbody.innerHTML = '<tr><td colspan="6" class="no-data">No products found. Click "Add Product" to get started.</td></tr>';
        } else {
            console.log('Displaying', products.length, 'products in table');
            if (tbody.querySelector('.no-data')) {
                tbody.innerHTML = '';
                tbody.appendChild(fragment);
            }
        }

        // Only reattach event listeners if there were updates
        if (hasUpdates) {
            attachProductEventListeners();
        }

        // Restore scroll position after updates
        tbody.scrollTop = scrollPosition;
    });
}

// Load categories
function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = '';
    
    if (categories.length === 0) {
        categoriesGrid.innerHTML = '<p class="no-data">No categories found</p>';
        return;
    }
    
    categories.forEach(category => {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'category-card';
        categoryEl.innerHTML = `
            <div class="category-image">
                <img src="${category.image}" alt="${category.name}">
                <div class="category-actions">
                    <button class="btn-icon edit-category" data-id="${category.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete-category" data-id="${category.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${category.description || 'No description'}</p>
                <span class="product-count">${products.filter(p => p.category === category.name).length} products</span>
            </div>
        `;
        categoriesGrid.appendChild(categoryEl);
    });
}

// Product CRUD operations
function openProductModal(product = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');
    const productId = document.getElementById('productId');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productStock = document.getElementById('productStock');
    const productDescription = document.getElementById('productDescription');
    const productCategory = document.getElementById('productCategory');
    const imagePreview = document.getElementById('imagePreview');
    
    // Clear previous options and add default
    productCategory.innerHTML = '<option value="">Select a category</option>';
    
    // Populate categories dropdown
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name;
        option.textContent = cat.name;
        productCategory.appendChild(option);
    });
    
    if (product) {
        // Edit mode
        title.textContent = 'Edit Product';
        productId.value = product.id;
        productName.value = product.name || '';
        productPrice.value = product.price || '';
        productStock.value = product.stock || '';
        productDescription.value = product.description || '';
        
        // Set category if it exists
        if (product.category) {
            productCategory.value = product.category;
        }
        
        // Set image preview if exists
        if (product.image) {
            imagePreview.innerHTML = `<img src="${product.image}" alt="${product.name}" class="preview-image">`;
        } else {
            imagePreview.innerHTML = '<div class="no-image">No image selected</div>';
        }
    } else {
        // Add new mode
        title.textContent = 'Add New Product';
        form.reset();
        imagePreview.innerHTML = '<div class="no-image">No image selected</div>';
    }
    
    // Show the modal with animation
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    productName.focus();
}

function handleProductSubmit(e) {
    e.preventDefault();
    
    const productId = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const description = document.getElementById('productDescription').value.trim();
    const imageInput = document.getElementById('productImage');
    
    // Enhanced validation
    if (!name) {
        showNotification('Please enter a product name', 'error');
        document.getElementById('productName').focus();
        return;
    }
    
    if (!category) {
        showNotification('Please select a category', 'error');
        document.getElementById('productCategory').focus();
        return;
    }
    
    if (isNaN(price) || price <= 0) {
        showNotification('Please enter a valid price', 'error');
        document.getElementById('productPrice').focus();
        return;
    }
    
    if (isNaN(stock) || stock < 0) {
        showNotification('Please enter a valid stock quantity', 'error');
        document.getElementById('productStock').focus();
        return;
    }
    
    // Handle image upload (in a real app, you would upload the file to a server)
    let imageUrl = '';
    if (imageInput.files && imageInput.files[0]) {
        // In a real app, you would upload the file here and get the URL
        // For this example, we'll create a data URL for the image
        imageUrl = URL.createObjectURL(imageInput.files[0]);
    }
    
    if (productId) {
        // Update existing product
        const index = products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name,
                category,
                price,
                stock,
                description: description || products[index].description,
                image: imageUrl || products[index].image || 'images/no-image.png'
            };
            showNotification('Product updated successfully', 'success');
        }
    } else {
        // Add new product
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name,
            category,
            price,
            stock,
            description,
            image: imageUrl || 'images/no-image.png',
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        showNotification('Product added successfully', 'success');
    }
    
    // Save to localStorage and notify other pages
    localStorage.setItem('products', JSON.stringify(products));
    dispatchProductUpdate();
    
    // Close modal and refresh the products list
    closeAllModals();
    loadProducts();
    loadDashboard(); // Refresh dashboard stats
    
    // Reset form for next use
    document.getElementById('productForm').reset();
}

// Delete a product
function deleteProduct(productId) {
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        dispatchProductUpdate();
        loadProducts();
        // Show success message in the UI without additional notification
        const productRow = document.querySelector(`tr[data-product-id="${productId}"]`);
        if (productRow) {
            const statusCell = productRow.querySelector('.delete-status');
            if (!statusCell) {
                const statusCell = document.createElement('span');
                statusCell.className = 'delete-status';
                statusCell.textContent = 'Deleted';
                statusCell.style.color = '#e74c3c';
                statusCell.style.marginLeft = '10px';
                productRow.querySelector('.actions').appendChild(statusCell);
                
                // Remove the status after a delay
                setTimeout(() => {
                    statusCell.style.opacity = '0';
                    setTimeout(() => statusCell.remove(), 300);
                }, 2000);
            }
        }
    }
}

// Edit a product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        openProductModal(product);
    } else {
        showNotification('Product not found', 'error');
    }
}

// Edit a category
function editCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
        // Open category modal with category data
        document.getElementById('categoryId').value = category.id;
        document.getElementById('categoryName').value = category.name;
        document.getElementById('categoryDescription').value = category.description || '';
        
        // Show the modal
        const modal = document.getElementById('categoryModal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set modal title
        document.getElementById('categoryModalTitle').textContent = 'Edit Category';
    } else {
        showNotification('Category not found', 'error');
    }
}

// Confirm before delete
function confirmDelete(type, id, customMessage = '') {
    const message = customMessage || `Are you sure you want to delete this ${type}?`;
    if (confirm(message)) {
        if (type === 'product') {
            deleteProduct(id);
        } else if (type === 'category') {
            deleteCategory(id);
        }
    }
}

function deleteCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    // Remove products in this category
    products = products.filter(p => p.category !== category.name);
    
    // Remove the category
    categories = categories.filter(c => c.id !== categoryId);
    
    // Save changes
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('categories', JSON.stringify(categories));
    dispatchProductUpdate();
    
    // Update UI
    loadProducts();
    loadCategories();
    loadDashboard();
    
    showNotification('Category and associated products deleted!', 'success');
}

// Close all modals with animation
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    document.body.style.overflow = 'auto';
    
    // Reset any file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.value = '';
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.admin-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        word-wrap: break-word;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#2ecc71';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f39c12';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Logout
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '../index.html';
}

// Test function to verify product synchronization (for debugging)
function testProductSync() {
    console.log('=== Product Synchronization Test ===');
    
    // Test 1: Check if products are loaded in admin
    const adminProducts = JSON.parse(localStorage.getItem('products') || '[]');
    console.log('Products in localStorage:', adminProducts.length);
    
    // Test 2: Check if products table is populated
    const productRows = document.querySelectorAll('#productsTableBody tr[data-product-id]');
    console.log('Product rows in admin table:', productRows.length);
    
    // Test 3: Verify dispatchProductUpdate function exists
    console.log('dispatchProductUpdate function exists:', typeof dispatchProductUpdate === 'function');
    
    // Test 4: Check if homepage would receive updates
    console.log('productsUpdated event can be dispatched:', typeof CustomEvent === 'function');
    
    console.log('=== End Test ===');
}

// Add test button to admin panel (for debugging)
document.addEventListener('DOMContentLoaded', function() {
    // Add test button to dashboard section (only for development)
    const dashboardSection = document.getElementById('dashboard-section');
    if (dashboardSection && window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const testButton = document.createElement('button');
        testButton.className = 'btn btn-secondary';
        testButton.textContent = 'Test Sync';
        testButton.style.marginTop = '10px';
        testButton.addEventListener('click', testProductSync);
        
        const statsGrid = dashboardSection.querySelector('.stats-grid');
        if (statsGrid) {
            statsGrid.parentNode.insertBefore(testButton, statsGrid.nextSibling);
        }
    }
});
