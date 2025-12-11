document.addEventListener('DOMContentLoaded', function() {
    // Toggle Password Visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Password Strength Checker
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text span');
        
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            // Update strength bar
            strengthBar.style.width = `${strength.percentage}%`;
            strengthBar.style.backgroundColor = strength.color;
            
            // Update strength text
            strengthText.textContent = strength.text;
            strengthText.style.color = strength.color;
        });
    }

    // Admin credentials (in a real app, this would be handled server-side with proper hashing)
    const ADMIN_CREDENTIALS = {
        email: 'admin@store.com',
        password: 'Admin7989' // In production, use proper authentication with hashed passwords
    };

    // Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.email.value.trim();
            const password = this.password.value;
            const remember = this.remember?.checked || false;
            
            // Check for admin credentials
            if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
                // Set admin login state
                localStorage.setItem('adminLoggedIn', 'true');
                
                // Redirect to admin panel
                window.location.href = '../admin/index.html';
                return;
            }
            
            // Regular user login (existing code)
            console.log('Login attempt with:', { email, remember });
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Login successful! Redirecting...';
            successMessage.style.color = 'green';
            successMessage.style.marginTop = '10px';
            loginForm.appendChild(successMessage);
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = this.fullname.value;
            const email = this.email.value;
            const phone = this.phone.value;
            const password = this.password.value;
            const confirmPassword = this.confirmPassword.value;
            
            // Simple validation
            if (password !== confirmPassword) {
                showError('Passwords do not match!');
                return;
            }
            
            if (!this.terms.checked) {
                showError('You must accept the terms and conditions');
                return;
            }
            
            // Simulate signup (replace with actual signup logic)
            console.log('Signup attempt with:', { fullname, email, phone });
            showSuccess('Account created successfully! Redirecting...');
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Social Login Buttons
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            console.log(`${provider} login clicked`);
            // Add social login logic here
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, button, .auth-button, .social-button');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Password Strength Checker Function
    function checkPasswordStrength(password) {
        let strength = 0;
        const regex = /[$@!%*?&]/;
        
        // Check length
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 15;
        
        // Check for numbers
        if (/\d/.test(password)) strength += 20;
        
        // Check for special characters
        if (regex.test(password)) strength += 20;
        
        // Check for both lowercase and uppercase
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
        
        // Determine strength level
        if (strength < 40) {
            return { percentage: 25, color: '#e74c3c', text: 'Weak' };
        } else if (strength < 70) {
            return { percentage: 50, color: '#f39c12', text: 'Moderate' };
        } else if (strength < 90) {
            return { percentage: 75, color: '#3498db', text: 'Strong' };
        } else {
            return { percentage: 100, color: '#2ecc71', text: 'Very Strong' };
        }
    }

    // Show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        // Style the success message
        successDiv.style.position = 'fixed';
        successDiv.style.top = '20px';
        successDiv.style.left = '50%';
        successDiv.style.transform = 'translateX(-50%)';
        successDiv.style.backgroundColor = '#2ecc71';
        successDiv.style.color = 'white';
        successDiv.style.padding = '12px 24px';
        successDiv.style.borderRadius = '4px';
        successDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        successDiv.style.zIndex = '1000';
        successDiv.style.animation = 'fadeIn 0.3s ease-out';
        
        document.body.appendChild(successDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 3000);
    }

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Style the error message
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '20px';
        errorDiv.style.left = '50%';
        errorDiv.style.transform = 'translateX(-50%)';
        errorDiv.style.backgroundColor = '#e74c3c';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '12px 24px';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        errorDiv.style.zIndex = '1000';
        errorDiv.style.animation = 'fadeIn 0.3s ease-out';
        
        document.body.appendChild(errorDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                errorDiv.remove();
            }, 300);
        }, 3000);
    }

    // Ripple Effect for Buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        // Create ripple element
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 600ms linear';
        ripple.style.pointerEvents = 'none';
        
        // Position the ripple
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Add ripple to button
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -10px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, 0); }
        to { opacity: 0; transform: translate(-50%, -10px); }
    }
`;
document.head.appendChild(style);
});
