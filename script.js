document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple interaction for stats card 3D tilt effect on mouse move
    const card = document.querySelector('.hero-stats');
    if(card) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset transform on mouse leave
        document.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateY(-10deg) rotateX(5deg)`;
        });
    }
});
