const sidebar = document.getElementById('contactSidebar');
const openBtn = document.getElementById('openSidebar') || document.getElementById('openSidebarFloating');
const closeBtn = document.getElementById('closeSidebar');

// Abrir
if (openBtn) {
    openBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
}

// Fechar ao clicar no botão "X"
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

// Fechar ao clicar fora da sidebar
window.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        e.target !== openBtn &&
        e.target !== document.querySelector('.fa-envelope') // ícone
    ) {
        sidebar.classList.remove('active');
    }
});


document.getElementById('openSidebar').addEventListener('click', function() {
    document.getElementById('contactSidebar').classList.add('active');
});

document.getElementById('closeSidebar').addEventListener('click', function() {
    document.getElementById('contactSidebar').classList.remove('active');
});
// No seu arquivo novo_script.js ou diretamente no HTML
document.addEventListener('DOMContentLoaded', function() {
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
            document.body.style.overflow = 'hidden'; // Impede rolagem do body
        });
    }

    if (closeSidebarButton && contactSidebar) {
        closeSidebarButton.addEventListener('click', function() {
            contactSidebar.classList.remove('active');
            if (overlaySidebar) {
                overlaySidebar.classList.remove('active');
            }
            document.body.style.overflow = ''; // Restaura rolagem do body
        });
    }

    if (overlaySidebar && contactSidebar) {
        overlaySidebar.addEventListener('click', function() {
            contactSidebar.classList.remove('active');
            overlaySidebar.classList.remove('active');
            document.body.style.overflow = ''; // Restaura rolagem do body
        });
    }
});
