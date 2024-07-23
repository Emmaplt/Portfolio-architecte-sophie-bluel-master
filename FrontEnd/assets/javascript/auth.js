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
        if(e)
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

//Fonction de création de fonctionnalité de ma page modal 
function initializeGalleryModal() {

    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

    document.querySelectorAll('.js-modal').forEach(a => {
        a.addEventListener('click', openModal);
    });
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

const addPhotoModal = document.querySelector("#modal-add-photo");
const openAddPhotoButton = document.querySelector(".js-open-add-photo-modal");

// Vérifier si la modal et le bouton existent
if (!addPhotoModal || !openAddPhotoButton) {
    console.error('Add photo modal or open button not found');
}

// Ouvrir la deuxième modal
const openAddPhotoModal = function (e) {
    e.preventDefault();
    addPhotoModal.style.display = 'flex';
    addPhotoModal.removeAttribute('aria-hidden');
    addPhotoModal.setAttribute('aria-modal', 'true');
};

// Fonction pour vérifier si tous les champs sont remplis
function validateForm() {
    const imageInput = document.getElementById('imageInput');
    const titreInput = document.getElementById('titre');
    const categoriesSelect = document.getElementById('categories');
    const submitButton = document.getElementById('submitButton');

    // Vérifiez si tous les champs requis sont remplis
    if (imageInput.files.length > 0 && titreInput.value.trim() !== '' && categoriesSelect.value !== '') {
        submitButton.disabled = false;
        submitButton.classList.remove('valider-photo:disabled');
    } else {
        submitButton.disabled = true;
        submitButton.classList.add('valider-photo:disabled');
    }
}

// Ajoutez des écouteurs d'événements pour les champs du formulaire
const imageInput = document.getElementById('imageInput');
const titreInput = document.getElementById('titre');
const categoriesSelect = document.getElementById('categories');

imageInput.addEventListener('change', validateForm);
titreInput.addEventListener('input', validateForm);
categoriesSelect.addEventListener('change', validateForm);

// Initialisez l'état du bouton lors du chargement de la page
validateForm();

// Fonction pour réinitialiser le formulaire et l'aperçu de l'image de la deuxième modal
function resetAddPhotoForm() {
    const photoForm = document.getElementById('photoForm');
    const imageInput = document.getElementById('imageInput');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const photoWrapper = document.querySelector('.photo-wrapper');
    const submitButton = document.getElementById('submitButton');

    if (photoForm) {
        photoForm.reset(); // Réinitialiser le formulaire
    }
    if (imageInput) {
        imageInput.value = ""; // Réinitialiser l'input file
    }
    if (imagePreviewContainer) {
        imagePreviewContainer.setAttribute('src', '#'); // Réinitialiser l'aperçu de l'image
        imagePreviewContainer.style.display = 'none'; // Cacher l'aperçu de l'image
    }
    if (photoWrapper) {
        photoWrapper.style.display = 'flex'; // Afficher le conteneur de la photo par défaut
    }
    // Réinitialiser l'état du bouton
    submitButton.disabled = true;
    submitButton.classList.add('valider-photo:disabled');
}

// Fermer la deuxième modal et réinitialiser le formulaire
const closeAddPhotoModal = function (e) {
    if(e)
    e.preventDefault();
    addPhotoModal.style.display = 'none';
    addPhotoModal.setAttribute('aria-hidden', 'true');
    addPhotoModal.removeAttribute('aria-modal');
    document.querySelector("#modal1").style.display = 'none';  // Assure que la première modal est fermée

    //Appeler la fonction pour rénitialiser le formulaire
    resetAddPhotoForm();
};

// Renvoyer à la première modal et réinitialiser le formulaire de la deuxième modal
const returnToModal1 = function (e) {
    e.preventDefault();
    addPhotoModal.style.display = 'none';
    addPhotoModal.setAttribute('aria-hidden', 'true');
    addPhotoModal.removeAttribute('aria-modal');

    const modal1 = document.querySelector("#modal1");
    if (modal1) {
        modal1.style.display = 'flex';
        modal1.removeAttribute('aria-hidden');
        modal1.setAttribute('aria-modal', 'true');
    }
};

// Fonction pour initialiser la modale d'ajout de photo
function initializeAddPhotoModal() {
  
    addPhotoModal.addEventListener('click', closeAddPhotoModal);
    addPhotoModal.querySelector('.js-modal-close').addEventListener('click', closeAddPhotoModal);
    addPhotoModal.querySelector('.js-modal-return').addEventListener('click', returnToModal1);
    addPhotoModal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);

    openAddPhotoButton.addEventListener('click', openAddPhotoModal);
}

// Fonction pour envoyer les données du formulaire d'ajout de projet
function addProject(formData) {
    fetch(`${api}/works`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            fetchData(); // Rafraîchir les données pour afficher le nouveau projet ajouté
            closeAddPhotoModal();
        } else {
            return response.text().then(text => {
                console.error('Failed to add project:', text);
                // Afficher un message d'erreur à l'utilisateur ou gérer l'erreur d'une autre manière
            });
        }
    })
    .catch(error => {
        console.error('Error adding project:', error);
        // Gérer l'erreur ici, par exemple afficher un message d'erreur générique à l'utilisateur
    });
}

// Initialiser la gestion de l'envoi du formulaire
function initializeFormHandling() {
    const photoForm = document.getElementById('photoForm');
    const input= document.getElementById('imageInput');
    const img= document.getElementById('imagePreviewContainer');
    const photoWrapper= document.querySelector('.photo-wrapper');

    input.addEventListener('change',function(event) {
        console.log('test');
        const file = input.files;
        if (file) {
                const fileReader = new FileReader();
                fileReader.onload = event => {
                img.setAttribute('src', event.target.result);
                img.style.display= 'block';
                photoWrapper.style.display= 'none';
            }
            fileReader.readAsDataURL(file[0]);
        }
    })

    if (photoForm) {
        photoForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(photoForm);
            addProject(formData);
        });
    } else {
        console.error('Photo form not found');
    }
}

// Appeler la fonction d'initialisation
initializeFormHandling();

