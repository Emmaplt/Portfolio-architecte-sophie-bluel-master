document.addEventListener('DOMContentLoaded', function() {
    const authToken = localStorage.getItem('authToken');
    const nomElement = document.getElementById('nom').querySelector('a');

    if (authToken) {
        // Modifier l'interface utilisateur pour un utilisateur connecté
        nomElement.textContent = 'logout';
        nomElement.classList.add('logout');
        nomElement.href = '#';  // Empêcher l'action par défaut
        nomElement.addEventListener('click', function(event) {
            event.preventDefault(); // Empêcher le comportement des liens par défaut
            localStorage.removeItem('authToken');
            window.location.reload(); // Recharge la page pour mettre à jour l'interface utilisateur
        });

        //Ajout de la barre d'édition
        const editBar = document.getElementById('edit-bar')
        if (editBar) {
            editBar.style.display = 'flex';
        }

        //Masquer les filtres
        const filtersContainer = document.getElementById('filters');
        if (filtersContainer) {
            filtersContainer.style.display = 'none';
        }

        //Ajouter ou modifier des éléments spécifiques pour les utilisateurs connectés
        // addConnectedUserElements();

    } else {
        nomElement.textContent = 'login';
        nomElement.href = './login.html';
    }
});

