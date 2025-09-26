// Adicionar animações aos cards quando entrarem na viewport
const observeCards = () => {
  const cards = document.querySelectorAll('.step-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
};

// Executar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  // Animar entrada do conteúdo
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      mainContent.style.transition = 'all 0.5s ease';
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Iniciar animações dos cards
  setTimeout(observeCards, 500);
});