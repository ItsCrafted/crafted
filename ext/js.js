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
        
        async function checkStatus(button) {
            const card = button.closest('.project-card');
            const apiKey = card.getAttribute('data-api-key');
            const indicator = button.querySelector('.status-indicator');
            const buttonText = button.childNodes[1];
            card.classList.remove('status-online', 'status-offline', 'status-error');
            card.setAttribute('data-status-text', 'Checking...');
            card.classList.add('status-checking');
            
            indicator.className = 'status-indicator loading';
            buttonText.textContent = ' Checking...';
            
            try {
                const response = await fetch('https://api.uptimerobot.com/v2/getMonitors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `api_key=${apiKey}&format=json`
                });
                
                const data = await response.json();
                card.classList.remove('status-checking');
                
                if (data.stat === 'ok' && data.monitors && data.monitors.length > 0) {
                    const monitor = data.monitors[0];
                    const status = monitor.status;
                    
                    if (status === 2) {
                        card.setAttribute('data-status-text', 'ONLINE');
                        card.classList.add('status-online');
                        indicator.className = 'status-indicator online';
                        buttonText.textContent = ' Online';
                        setTimeout(() => {
                            card.classList.remove('status-online');
                        }, 2000);
                    } else {
                        card.setAttribute('data-status-text', 'DOWN');
                        card.classList.add('status-offline');
                        indicator.className = 'status-indicator offline';
                        buttonText.textContent = ' Offline';
                        setTimeout(() => {
                            card.classList.remove('status-offline');
                        }, 2000);
                    }
                } else {
                    card.setAttribute('data-status-text', 'CHECK FAILURE');
                    card.classList.add('status-error');
                    indicator.className = 'status-indicator';
                    buttonText.textContent = ' Status Unknown';
                    setTimeout(() => {
                        card.classList.remove('status-error');
                    }, 2000);
                }
            } catch (error) {
                console.error('Error checking status:', error);
                card.classList.remove('status-checking');
                card.setAttribute('data-status-text', 'CHECK FAILURE');
                card.classList.add('status-error');
                indicator.className = 'status-indicator';
                buttonText.textContent = ' Error Checking';
                setTimeout(() => {
                    card.classList.remove('status-error');
                }, 2000);
            }
        }