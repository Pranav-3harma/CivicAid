// CivicConnect Application JavaScript

// Global state
let currentUser = null;
let currentPage = 'home';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeAnimations();
});

function initializeApp() {
    setupNavigation();
    setupForms();
    loadHomePage();
    setupMobileMenu();
}

// Navigation functions
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

function navigateToPage(page) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = page;
        
        // Load page-specific content
        switch(page) {
            case 'home':
                loadHomePage();
                break;
            case 'report':
                loadReportPage();
                break;
            case 'view-issues':
                loadViewIssuesPage();
                break;
            case 'tracking':
                loadTrackingPage();
                break;
            case 'login':
                loadLoginPage();
                break;
        }
    }
}

// Mobile menu setup
function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Page loading functions
function loadHomePage() {
    // Home page is already loaded in HTML
}

function loadReportPage() {
    const form = document.getElementById('issue-form');
    if (form) {
        form.reset();
        document.getElementById('image-preview').style.display = 'none';
    }
}

function loadViewIssuesPage() {
    displayIssues();
    setupFilters();
}

function loadTrackingPage() {
    document.getElementById('tracking-result').style.display = 'none';
    document.getElementById('tracking-id').value = '';
}


function loadLoginPage() {
    const form = document.getElementById('login-form');
    if (form) {
        form.reset();
    }
}

// Form handling
function setupForms() {
    // Issue form
    const issueForm = document.getElementById('issue-form');
    if (issueForm) {
        issueForm.addEventListener('submit', handleIssueSubmission);
    }
    
    // Image preview
    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', handleImagePreview);
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function handleIssueSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const issueData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        location: formData.get('location'),
        image: formData.get('image')
    };
    
    // Add issue to data
    const newIssue = DataService.addIssue(issueData);
    
    // Show success message
    alert(`Issue reported successfully! Your issue ID is: ${newIssue.id}`);
    
    // Reset form
    e.target.reset();
    document.getElementById('image-preview').style.display = 'none';
    
    // Navigate to view issues
    navigateToPage('view-issues');
}

function handleImagePreview(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('image-preview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    const user = DataService.authenticateUser(email, password);
    
    if (user) {
        currentUser = user;
        alert(`Welcome, ${user.name}!`);
        navigateToPage('home');
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// View Issues Page functions
function displayIssues(issues = null) {
    const issuesList = document.getElementById('issues-list');
    const issuesToShow = issues || DataService.getAllIssues();
    
    if (issuesToShow.length === 0) {
        issuesList.innerHTML = '<p class="text-center">No issues found matching your criteria.</p>';
        return;
    }
    
    issuesList.innerHTML = issuesToShow.map(issue => `
        <div class="issue-card">
            ${issue.image ? `
                <div class="issue-image">
                    <img src="${issue.image}" alt="${issue.title}" loading="lazy">
                </div>
            ` : ''}
            <div class="issue-header">
                <div>
                    <h3 class="issue-title">${issue.title}</h3>
                    <span class="issue-category category-${issue.category.toLowerCase()}">${issue.category}</span>
                </div>
                <span class="status-badge status-${issue.status.toLowerCase().replace(' ', '-')}">${issue.status}</span>
            </div>
            <p class="issue-description">${issue.description}</p>
            <div class="issue-location">
                📍 ${issue.location}
            </div>
            <div class="issue-meta">
                <small>ID: ${issue.id} | Reported: ${issue.date}</small>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const category = document.getElementById('category-filter').value;
    const status = document.getElementById('status-filter').value;
    
    const filteredIssues = DataService.getFilteredIssues(category, status);
    displayIssues(filteredIssues);
}

// Tracking functions
function trackComplaint() {
    const trackingId = document.getElementById('tracking-id').value.trim();
    const resultDiv = document.getElementById('tracking-result');
    
    if (!trackingId) {
        alert('Please enter a complaint ID');
        return;
    }
    
    const issue = DataService.getIssueById(trackingId);
    
    if (!issue) {
        resultDiv.innerHTML = '<p>No complaint found with that ID. Please check your ID and try again.</p>';
        resultDiv.style.display = 'block';
        return;
    }
    
    const timelineHtml = issue.timeline.map((item, index) => {
        const isCompleted = index < issue.timeline.length - 1 || issue.status === 'Resolved';
        const isCurrent = index === issue.timeline.length - 1 && issue.status !== 'Resolved';
        
        return `
            <div class="timeline-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                <div>
                    <strong>${item.status}</strong>
                    <p>${item.description}</p>
                    <small>${item.date}</small>
                </div>
            </div>
        `;
    }).join('');
    
    resultDiv.innerHTML = `
        <h2>Complaint Details</h2>
        <div class="issue-details">
            <h3>${issue.title}</h3>
            <p><strong>Category:</strong> ${issue.category}</p>
            <p><strong>Location:</strong> ${issue.location}</p>
            <p><strong>Description:</strong> ${issue.description}</p>
            <p><strong>Current Status:</strong> <span class="status-badge status-${issue.status.toLowerCase().replace(' ', '-')}">${issue.status}</span></p>
        </div>
        <div class="timeline">
            <h3>Status Timeline</h3>
            ${timelineHtml}
        </div>
    `;
    
    resultDiv.style.display = 'block';
}


// Utility functions
function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#66bb6a' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Animation functions
function initializeAnimations() {
    setupScrollAnimations();
    setupHoverEffects();
    setupLoadingStates();
    setupAdvancedAnimations();
    setupParticleEffects();
    setupMagneticEffects();
    setupTypewriterEffect();
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Add scroll-reveal class to elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll('.issue-card, .feature-card, .chart-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

function setupHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .submit-btn, .login-btn, .action-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function setupLoadingStates() {
    // Add loading animation to form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="loading"></span> Processing...';
                submitBtn.disabled = true;
                
                // Re-enable after a delay (for demo purposes)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add floating animation to feature icons
function addFloatingAnimation() {
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
        icon.classList.add('floating');
    });
}

// Add bounce animation to status badges
function addBounceToStatusBadges() {
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.classList.add('bounce');
        });
        
        badge.addEventListener('animationend', function() {
            this.classList.remove('bounce');
        });
    });
}

// Enhanced page transitions
function navigateToPage(page) {
    const currentPageElement = document.querySelector('.page.active');
    const targetPageElement = document.getElementById(`${page}-page`);
    
    if (currentPageElement && targetPageElement) {
        // Add exit animation
        currentPageElement.style.animation = 'fadeOut 0.3s ease-in-out';
        
        setTimeout(() => {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(p => p.classList.remove('active'));
            
            // Show selected page
            targetPageElement.classList.add('active');
            currentPage = page;
            
            // Add entrance animation
            targetPageElement.style.animation = 'fadeIn 0.5s ease-in-out';
            
            // Load page-specific content
            switch(page) {
                case 'home':
                    loadHomePage();
                    addFloatingAnimation();
                    break;
                case 'report':
                    loadReportPage();
                    break;
                case 'view-issues':
                    loadViewIssuesPage();
                    addBounceToStatusBadges();
                    break;
                case 'tracking':
                    loadTrackingPage();
                    break;
                case 'login':
                    loadLoginPage();
                    break;
            }
        }, 300);
    }
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// Advanced animation functions
function setupAdvancedAnimations() {
    // Add wiggle animation to buttons on click
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('wiggle');
            setTimeout(() => {
                this.classList.remove('wiggle');
            }, 1000);
        });
    });

    // Add glow effect to important elements
    const importantElements = document.querySelectorAll('.cta-button, .status-badge');
    importantElements.forEach(el => {
        el.classList.add('glow');
    });

    // Add heartbeat to status badges
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        if (badge.textContent.includes('Pending') || badge.textContent.includes('In Progress')) {
            badge.classList.add('heartbeat');
        }
    });

    // Enhanced logo button functionality
    setupLogoButton();
}

function setupLogoButton() {
    const logoButton = document.querySelector('.logo-button');
    if (logoButton) {
        // Add click animation
        logoButton.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(99, 179, 237, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Add pulse effect
            this.style.animation = 'logoGlow 0.3s ease-out, pulse 0.6s ease-out';
            
            setTimeout(() => {
                this.style.animation = 'logoGlow 3s ease-in-out infinite alternate';
            }, 600);
        });

        // Add magnetic effect to logo
        logoButton.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.setProperty('--x', x * 0.05 + 'px');
            this.style.setProperty('--y', y * 0.05 + 'px');
        });
        
        logoButton.addEventListener('mouseleave', function() {
            this.style.setProperty('--x', '0px');
            this.style.setProperty('--y', '0px');
        });
    }
}

function setupParticleEffects() {
    // Create floating particles in hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 20; i++) {
            createParticle(hero);
        }
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 6000);

    // Create new particle
    setTimeout(() => {
        createParticle(container);
    }, Math.random() * 2000 + 1000);
}

function setupMagneticEffects() {
    const magneticElements = document.querySelectorAll('.cta-button, .nav-link, .feature-card');
    
    magneticElements.forEach(element => {
        element.classList.add('magnetic');
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.setProperty('--x', x * 0.1 + 'px');
            this.style.setProperty('--y', y * 0.1 + 'px');
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.setProperty('--x', '0px');
            this.style.setProperty('--y', '0px');
        });
    });
}

function setupTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.classList.add('typewriter');
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.classList.remove('typewriter');
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Enhanced notification with animations
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#66bb6a' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: slideInFromRight 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Add exit animation
    setTimeout(() => {
        notification.style.animation = 'slideInFromRight 0.5s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2500);
}

// Enhanced form submission with success animation
function handleIssueSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const issueData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        location: formData.get('location'),
        image: formData.get('image')
    };
    
    // Add issue to data
    const newIssue = DataService.addIssue(issueData);
    
    // Show success animation
    const form = e.target;
    form.style.animation = 'zoomIn 0.5s ease-out';
    
    // Create success message with animation
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem; background: #2d3748; border-radius: 10px; margin: 1rem 0; border: 2px solid #66bb6a; animation: slideInUp 0.6s ease-out;">
            <h3 style="color: #66bb6a; margin-bottom: 1rem;">✅ Issue Reported Successfully!</h3>
            <p style="color: #e0e0e0; margin-bottom: 1rem;">Your issue has been submitted and is being reviewed.</p>
            <p style="color: #63b3ed; font-weight: 600;">Issue ID: ${newIssue.id}</p>
        </div>
    `;
    
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    // Reset form with animation
    setTimeout(() => {
        form.reset();
        document.getElementById('image-preview').style.display = 'none';
        form.style.animation = 'fadeIn 0.5s ease-out';
    }, 1000);
    
    // Navigate to view issues after delay
    setTimeout(() => {
        navigateToPage('view-issues');
    }, 3000);
}

// Export functions for global access
window.navigateToPage = navigateToPage;
window.trackComplaint = trackComplaint;
