
        // Loading animation
        window.addEventListener('load', function() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 1000);
        });

        // Mobile navigation
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }
        });

        // Form validation and submission
        const contactForm = document.getElementById('contactForm');
        const modal = document.getElementById('successModal');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });

            // Get form data
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            // Validate full name
            if (!fullName) {
                document.getElementById('nameError').textContent = 'Full name is required';
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }

            // Validate message
            if (!message) {
                document.getElementById('messageError').textContent = 'Message is required';
                isValid = false;
            }

            if (isValid) {
                // Show loading state
                const submitButton = contactForm.querySelector('.submit-button');
                const buttonText = submitButton.querySelector('.button-text');
                const buttonLoader = submitButton.querySelector('.button-loader');
                
                buttonText.style.display = 'none';
                buttonLoader.style.display = 'inline-block';
                submitButton.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button state
                    buttonText.style.display = 'inline-block';
                    buttonLoader.style.display = 'none';
                    submitButton.disabled = false;
                    
                    // Show success modal
                    modal.style.display = 'block';
                }, 2000);
            }
        });

        // Close modal function
        function closeModal() {
            modal.style.display = 'none';
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Add scroll progress indicator
        const scrollProgress = document.createElement('div');
        scrollProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(scrollProgress);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });

        // Add hover effects to service cards
        document.querySelectorAll('.service-card, .feature-card, .portfolio-item, .testimonial-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add typing animation to hero text
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                }
            }
            
            typing();
        }

        // Initialize typing animation when page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                const heroTitle = document.querySelector('.hero h1');
                if (heroTitle) {
                    const originalText = heroTitle.textContent;
                    heroTitle.style.opacity = '1';
                    typeWriter(heroTitle, originalText, 50);
                }
            }, 1500);
        });

        // Add click animation to CTA button
        document.querySelector('.cta-button').addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Progressive loading for better performance
        document.addEventListener('DOMContentLoaded', function() {
            // Lazy load images if any are added later
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.classList.remove('lazy');
                                imageObserver.unobserve(img);
                            }
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        });

        // Add smooth hover transitions to all interactive elements
        document.querySelectorAll('button, a, .card, .skill-tag').forEach(element => {
            element.style.transition = 'all 0.3s ease';
        });

        // Enhanced scroll animations with stagger effect
        function initScrollAnimations() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            fadeElements.forEach((element, index) => {
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        }

        // Initialize on page load
        window.addEventListener('load', initScrollAnimations);

        // Add parallax effect for hero background
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.3;
            
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.backgroundPosition = `center ${rate}px`;
            }
        });

        // Add dynamic navbar background
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const navbar = document.querySelector('.navbar');
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        // Add smooth loading animation for cards
        function animateCards() {
            const cards = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .feature-card, .about-card');
            
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }

        // Enhanced form validation with real-time feedback
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });

        function validateField(field) {
            const value = field.value.trim();
            const fieldType = field.type;
            const fieldName = field.name;
            let errorElement = document.getElementById(fieldName + 'Error');
            
            if (!errorElement) {
                // Create error element if it doesn't exist
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.id = fieldName + 'Error';
                field.parentNode.appendChild(errorElement);
            }
            
            if (!value) {
                showError(field, `${getFieldLabel(fieldName)} is required`);
                return false;
            }
            
            if (fieldType === 'email' && !isValidEmail(value)) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
            
            clearError(field);
            return true;
        }

        function showError(field, message) {
            const errorElement = document.getElementById(field.name + 'Error');
            if (errorElement) {
                errorElement.textContent = message;
                field.style.borderColor = '#e53e3e';
            }
        }

        function clearError(field) {
            const errorElement = document.getElementById(field.name + 'Error');
            if (errorElement) {
                errorElement.textContent = '';
                field.style.borderColor = '#e2e8f0';
            }
        }

        function getFieldLabel(fieldName) {
            const labels = {
                'fullName': 'Full name',
                'email': 'Email',
                'message': 'Message'
            };
            return labels[fieldName] || fieldName;
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Add loading states to all buttons
        document.querySelectorAll('button, .cta-button, .quote-button').forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Initialize AOS-like animations
        function initAnimations() {
            const animatedElements = document.querySelectorAll('.fade-in');
            
            const observerCallback = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Add stagger effect for child elements
                        const childElements = entry.target.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .feature-card');
                        childElements.forEach((child, index) => {
                            setTimeout(() => {
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Initialize everything when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            initAnimations();
        });

        // Add performance optimization
        let ticking = false;

        function updateScrollEffects() {
            // Update navbar
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });

        // Add custom cursor effect for interactive elements
        document.querySelectorAll('a, button, .card').forEach(element => {
            element.addEventListener('mouseenter', function() {
                document.body.style.cursor = 'pointer';
            });
            
            element.addEventListener('mouseleave', function() {
                document.body.style.cursor = 'default';
            });
        });

        // Add smooth page transitions
        window.addEventListener('beforeunload', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
        });

        // Final initialization
        window.addEventListener('load', function() {
            // Remove loading overlay
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                setTimeout(() => {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                    }, 500);
                }, 1000);
            }

            // Animate page entrance
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.5s ease';
        });
    