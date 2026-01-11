        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);
        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-scale').forEach(el => {
            observer.observe(el);
        });
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const parallaxElements = document.querySelectorAll('.parallax-slow');
                    
                    parallaxElements.forEach((el, index) => {
                        const speed = 0.3 + (index * 0.1);
                        el.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
        const techItems = document.querySelectorAll('.tech-item');
        const projectCards = document.querySelectorAll('.project-card');
        
        techItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
        
        projectCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.15}s`;
        });