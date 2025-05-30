// Funções para o novo navbar e efeitos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar-cosema');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contador de números para estatísticas
    const counterElements = document.querySelectorAll('.counter');
    if (counterElements.length > 0) {
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    let count = 0;
                    const speed = Math.floor(1000 / countTo);
                    
                    const updateCount = () => {
                        if (count < countTo) {
                            count++;
                            target.textContent = count;
                            setTimeout(updateCount, speed);
                        } else {
                            target.textContent = countTo;
                        }
                    };
                    
                    updateCount();
                    observer.unobserve(target);
                }
            });
        }, options);

        counterElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Botão voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Sidebar de contato
    const openSidebarButton = document.getElementById('openSidebar');
    const closeSidebarButton = document.getElementById('closeSidebar');
    const contactSidebar = document.getElementById('contactSidebar');
    const overlaySidebar = document.getElementById('overlaySidebar');

    if (openSidebarButton && contactSidebar) {
        openSidebarButton.addEventListener('click', function() {
            contactSidebar.classList.add('active');
            if (overlaySidebar) {
                overlaySidebar.classList.add('active');
            }
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeSidebarButton && contactSidebar) {
        closeSidebarButton.addEventListener('click', function() {
            contactSidebar.classList.remove('active');
            if (overlaySidebar) {
                overlaySidebar.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    }

    if (overlaySidebar && contactSidebar) {
        overlaySidebar.addEventListener('click', function() {
            contactSidebar.classList.remove('active');
            overlaySidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Validação de formulário
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Simulação de envio
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    const originalText = submitButton.textContent;
                    submitButton.disabled = true;
                    submitButton.textContent = 'Enviando...';
                    
                    setTimeout(() => {
                        showToast('Mensagem enviada com sucesso!', 'success');
                        form.reset();
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                        
                        // Fechar sidebar se for o formulário da sidebar
                        if (form.closest('#contactSidebar')) {
                            setTimeout(() => {
                                contactSidebar.classList.remove('active');
                                if (overlaySidebar) {
                                    overlaySidebar.classList.remove('active');
                                }
                                document.body.style.overflow = '';
                            }, 1000);
                        }
                    }, 2000);
                }
            }
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        
        // Remover mensagens de erro anteriores
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        // Validar campo obrigatório
        if (input.hasAttribute('required') && value === '') {
            showError(input, 'Este campo é obrigatório');
            isValid = false;
        }
        
        // Validar email
        if (input.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(input, 'Email inválido');
                isValid = false;
            }
        }
        
        // Validar telefone
        if (input.id === 'telefone' && value !== '') {
            const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                showError(input, 'Telefone inválido. Use o formato (99) 99999-9999');
                isValid = false;
            }
        }
        
        // Atualizar estilo do campo
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
        
        return isValid;
    }

    function showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message text-danger mt-1';
        errorElement.textContent = message;
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }

    function showToast(message, type = 'info') {
        // Verificar se o container de toasts existe
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Criar o toast
        const toastElement = document.createElement('div');
        toastElement.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'primary'} border-0`;
        toastElement.setAttribute('role', 'alert');
        toastElement.setAttribute('aria-live', 'assertive');
        toastElement.setAttribute('aria-atomic', 'true');
        
        const toastContent = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        toastElement.innerHTML = toastContent;
        toastContainer.appendChild(toastElement);
        
        // Inicializar e mostrar o toast
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 5000
        });
        toast.show();
        
        // Remover o toast após ser escondido
        toastElement.addEventListener('hidden.bs.toast', function() {
            toastElement.remove();
        });
    }

    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '(' + value;
                if (value.length > 3) {
                    value = value.substring(0, 3) + ') ' + value.substring(3);
                }
                if (value.length > 10) {
                    value = value.substring(0, 10) + '-' + value.substring(10);
                }
                if (value.length > 15) {
                    value = value.substring(0, 15);
                }
            }
            e.target.value = value;
        });
    }
});
