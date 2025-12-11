// Admin credentials (in a real app, this would be handled server-side with proper hashing)
const ADMIN_CREDENTIALS = {
    email: 'admin@store.com',
    password: 'Admin7989' // In production, use proper authentication with hashed passwords
};

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const currentPath = window.location.pathname;
    
    // Determine the correct paths based on current location
    if (!isLoggedIn) {
        // If not logged in and not on login page, redirect to login
        if (!currentPath.endsWith('login.html')) {
            const loginPath = currentPath.includes('admin/') ? 'login.html' : 'admin/login.html';
            window.location.href = loginPath;
        }
        return false;
    } else {
        // If logged in and on login page, redirect to dashboard
        if (currentPath.endsWith('login.html')) {
            const dashboardPath = currentPath.includes('admin/') ? 'index.html' : '../admin/index.html';
            window.location.href = dashboardPath;
            return false;
        }
        return true;
    }
}

// Toggle password visibility
function setupPasswordToggle() {
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
}

// Handle login form submission
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('loginError') || 
                               (() => {
                                   const el = document.createElement('div');
                                   el.id = 'loginError';
                                   el.className = 'error-message';
                                   el.style.color = 'red';
                                   loginForm.appendChild(el);
                                   return el;
                               })();
            
            // Clear previous errors
            errorElement.textContent = '';
            
            // Simple validation
            if (!email || !password) {
                errorElement.textContent = 'Please enter both email and password';
                return;
            }
            
            // Check credentials
            if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
                // Set login state
                localStorage.setItem('adminLoggedIn', 'true');
                
                // Always redirect to admin/index.html after successful login
                const currentPath = window.location.pathname;
                const isInAdminFolder = currentPath.includes('/admin/');
                
                // Determine the correct redirect path
                let redirectPath = isInAdminFolder ? 'index.html' : 'admin/index.html';
                
                console.log('Login successful, redirecting to:', redirectPath);
                window.location.href = redirectPath;
            } else {
                errorElement.textContent = 'Invalid username or password';
            }
        });
    }
}

// Logout functionality
function setupLogout() {
    const logoutBtns = document.querySelectorAll('#logoutBtn, [data-action="logout"]');
    
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            // Redirect to login page with correct path
            const adminBasePath = window.location.pathname.includes('/admin/') ? '' : 'admin/';
            window.location.href = adminBasePath + 'login.html';
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, current path:', window.location.pathname);
    
    // Setup login form if on login page
    if (window.location.pathname.includes('login.html')) {
        console.log('Setting up login form');
        setupLoginForm();
        setupPasswordToggle();
        
        // If already logged in, redirect to admin panel
        if (localStorage.getItem('adminLoggedIn') === 'true') {
            console.log('Already logged in, redirecting to admin panel');
            window.location.href = 'index.html';
        }
    } else {
        // Check authentication for other pages
        console.log('Checking authentication');
        if (checkAuth()) {
            console.log('User authenticated, setting up admin panel');
            setupLogout();
            // Initialize other admin functionality here
            if (typeof initAdminPanel === 'function') {
                initAdminPanel();
            }
        }
    }
});

