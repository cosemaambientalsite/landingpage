document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });

    const modal = new bootstrap.Modal(document.getElementById('premioModal'));
    const premioCards = document.querySelectorAll('.premio-card');
    const modalTitle = document.getElementById('premioModalLabel');
    const modalDesc = document.getElementById('premioDescricao');

    premioCards.forEach(card => {
        card.addEventListener('click', () => {
            const detalhes = card.getAttribute('data-premio');
            modalTitle.textContent = "Prêmio Cosema";
            modalDesc.textContent = detalhes;
            modal.show();
        });
    });
});
