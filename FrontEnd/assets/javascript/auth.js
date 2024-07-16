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

        //Ajout du bouton modifier
        const buttonModifier = document.getElementById('button-modifier')
        if (buttonModifier) {
            buttonModifier.style.display = 'flex';
        }

        //Masquer les filtres
        const filtersContainer = document.getElementById('filters');
        if (filtersContainer) {
            filtersContainer.style.display = 'none';
        }

        //Appel à la fonction modal
        initializeGalleryModal()
        initializeAddPhotoModal();

        //Ajouter ou modifier des éléments spécifiques pour les utilisateurs connectés
        // addConnectedUserElements();

    } else {
        nomElement.textContent = 'login';
        nomElement.href = './login.html';
    }
});

//Fonction de création de fonctionnalité de ma page modal 
function initializeGalleryModal() {

    let modal = document.querySelector("#modal1");
 

    //Ouvrir la page modal
    const openModal = function (e) {
        e.preventDefault();

        if (modal) {
            modal.style.display = 'flex';
            modal.removeAttribute('aria-hidden');
            modal.setAttribute('aria-modal', 'true');
        } else {
            console.error('Modal target not found');
        }
    }

    //Fermer la page modal
    const closeModal = function (e) {
        e.preventDefault()
        if (modal === null) return
            modal.style.display = 'none';
            modal.setAttribute('aria-modal', 'true');
            modal.removeAttribute('aria-hidden');
    }

    //Eviter de fermer dans la modal
    const stopPropagation = function (e) {
        e.stopPropagation()
    }

    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

    document.querySelectorAll('.js-modal').forEach(a => {
        a.addEventListener('click', openModal);
    });
}

// Fonction pour initialiser la modale d'ajout de photo
function initializeAddPhotoModal() {
    const addPhotoModal = document.querySelector("#modal-add-photo");
    const openAddPhotoButton = document.querySelector(".js-open-add-photo-modal");

    // Vérifier si la modal et le bouton existent
    if (!addPhotoModal || !openAddPhotoButton) {
        console.error('Add photo modal or open button not found');
        return;
    }

    const openAddPhotoModal = function (e) {
        e.preventDefault();
        addPhotoModal.style.display = 'flex';
        addPhotoModal.removeAttribute('aria-hidden');
        addPhotoModal.setAttribute('aria-modal', 'true');
    };

    const closeAddPhotoModal = function (e) {
        e.preventDefault();
        addPhotoModal.style.display = 'none';
        addPhotoModal.setAttribute('aria-hidden', 'true');
        addPhotoModal.removeAttribute('aria-modal');
    };

    const stopPropagation = function (e) {
        e.stopPropagation();
    };

    addPhotoModal.addEventListener('click', closeAddPhotoModal);
    addPhotoModal.querySelector('.js-modal-close').addEventListener('click', closeAddPhotoModal);
    addPhotoModal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);

    openAddPhotoButton.addEventListener('click', openAddPhotoModal);
}

// Supprimer le work
function deleteWork(id) {
    fetch(`${api}/works/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => {
        if (response.ok) {
            fetchData();
        } else {
            console.error('Failed to delete work');
        }
    });
}
