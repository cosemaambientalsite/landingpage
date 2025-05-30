// Adicionar funcionalidade para o botão flutuante na página sobre
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar de contato - botão flutuante
    const openSidebarFloatButton = document.getElementById('openSidebarFloat');
    const contactSidebar = document.getElementById('contactSidebar');
    const overlaySidebar = document.getElementById('overlaySidebar');
    
    if (openSidebarFloatButton && contactSidebar) {
        openSidebarFloatButton.addEventListener('click', function(e) {
            e.preventDefault();
            contactSidebar.classList.add('active');
            if (overlaySidebar) {
                overlaySidebar.classList.add('active');
            }
            document.body.style.overflow = 'hidden'; // Impede rolagem do body
        });
    }
});
