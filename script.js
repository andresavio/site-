class WealthGuideApp {
  constructor() {
    this.correctPassword = "familialegal.ofc";
    this.init();
  }

  init() {
    this.bindEvents();
    this.checkAuthStatus();
  }

  bindEvents() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => this.handleLogout(e));
    }

    // Toggle password visibility
    const togglePasswordBtn = document.getElementById('toggle-password');
    if (togglePasswordBtn) {
      togglePasswordBtn.addEventListener('click', (e) => this.togglePasswordVisibility(e));
    }

    // Enter key no input de senha
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
      passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleLogin(e);
        }
      });
    }
  }

  checkAuthStatus() {
    // Verifica se o usuário já está autenticado (sessionStorage)
    const isAuthenticated = sessionStorage.getItem('wealth_guide_auth') === 'true';
    
    if (isAuthenticated) {
      this.showMainContent();
    } else {
      this.showLoginScreen();
    }
  }

  handleLogin(e) {
    e.preventDefault();
    
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.querySelector('.login-btn');
    
    const enteredPassword = passwordInput.value.trim();
    
    // Validação da senha
    if (enteredPassword === this.correctPassword) {
      // Sucesso - animar botão
      loginBtn.style.background = '#27ae60';
      loginBtn.innerHTML = '<span>✓ Acesso liberado!</span>';
      
      // Salvar estado de autenticação
      sessionStorage.setItem('wealth_guide_auth', 'true');
      
      // Delay para mostrar feedback visual
      setTimeout(() => {
        this.showMainContent();
      }, 1000);
      
      errorMessage.textContent = '';
    } else {
      // Erro - mostrar mensagem
      this.showError('Senha incorreta. Tente novamente.');
      passwordInput.value = '';
      passwordInput.focus();
      
      // Animar o input com erro
      passwordInput.style.borderColor = '#e74c3c';
      setTimeout(() => {
        passwordInput.style.borderColor = '';
      }, 2000);
    }
  }

  handleLogout(e) {
    e.preventDefault();
    
    // Confirmar logout
    if (confirm('Tem certeza que deseja sair?')) {
      sessionStorage.removeItem('wealth_guide_auth');
      this.showLoginScreen();
    }
  }

  togglePasswordVisibility(e) {
    e.preventDefault();
    
    const passwordInput = document.getElementById('password-input');
    const eyeIcon = document.querySelector('.eye-icon');
    const eyeOffIcon = document.querySelector('.eye-off-icon');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.classList.add('hidden');
      eyeOffIcon.classList.remove('hidden');
    } else {
      passwordInput.type = 'password';
      eyeIcon.classList.remove('hidden');
      eyeOffIcon.classList.add('hidden');
    }
    
    // Manter o foco no input
    passwordInput.focus();
  }

  showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    
    // Animar mensagem de erro
    errorMessage.style.opacity = '0';
    errorMessage.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      errorMessage.style.transition = 'all 0.3s ease';
      errorMessage.style.opacity = '1';
      errorMessage.style.transform = 'translateY(0)';
    }, 100);
  }

  showLoginScreen() {
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    
    loginScreen.classList.remove('hidden');
    mainContent.classList.add('hidden');
    
    // Focar no input de senha
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
      setTimeout(() => passwordInput.focus(), 100);
    }
    
    // Reset do botão de login
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
      loginBtn.style.background = '';
      loginBtn.innerHTML = `
        <span>Entrar</span>
        <svg class="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
  }

  showMainContent() {
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    
    loginScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    // Animar entrada do conteúdo
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      mainContent.style.transition = 'all 0.5s ease';
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    }, 100);
    
    // Scroll para o topo
    window.scrollTo(0, 0);
  }
}

// Inicializar aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new WealthGuideApp();
});

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

// Executar animações após o conteúdo ser mostrado
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(observeCards, 1000);
});