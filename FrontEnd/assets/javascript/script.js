const api = "http://localhost:5678/api";

// Récupère et Affiche les works
function fetchData() {
    // Appel API
    fetch(api + "/works")
        .then(function (response) {
            // Transforme la réponse en json
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // Définit le point de montage des éléments
            const gallery = document.querySelector(".gallery");
            const modalGallery = document.querySelector(".modal .gallery-modal");
            modalGallery.innerHTML = ""; // Efface le contenu précédent
            gallery.innerHTML = "";
            // Boucle sur les éléments
            for (let i in data) {
                // Défini le work en fonction de l'indice i
                let work = data[i];
                console.log(work);
                console.log(work.title);
                /*
                <figure>
                    <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
                    <figcaption>Abajour Tahina</figcaption>
                </figure>
                */

                // Créer un élément figure et Afficher en appendChild dans gallery
                let figure = document.createElement("figure");
                figure.dataset.category = work.category.id;
                gallery.appendChild(figure);

                // Défini l'élément image et Afficher en appendChild dans figure
                let image = document.createElement("img");
                image.src = work.imageUrl;
                image.alt = work.title;
                // image.classList.add("emma");
                // image.dataset.work = work.id;
                figure.appendChild(image);

                // Créer un texte node et Afficher en appendChild dans figure
                let element = document.createTextNode(work.title);
                figure.appendChild(element);

                figure = document.createElement("figure");
                figure.dataset.id = work.id;

                image = document.createElement("img");
                image.src = work.imageUrl;
                image.alt = work.title;
                figure.appendChild(image);

                //Appel la fonction supprimé des works
                let deleteIcon = document.createElement("i");
                deleteIcon.className = "fa-solid fa-trash white-icone";
                deleteIcon.addEventListener("click", function () {
                    deleteWork(work.id);
                });
                figure.appendChild(deleteIcon);

                modalGallery.appendChild(figure);

            }
        })
}

// Fonction pour récupérer et afficher les catégories de filtres
function fetchCategories() {
    fetch(api + "/categories")
        .then(response => response.json())
        .then(categories => {
            const filterContainer = document.getElementById("filters");
            const select = document.getElementById("categories");
            filterContainer.innerHTML = ""; // Efface le contenu précédent

            // Ajoute un bouton pour "Tous"
            const allButton = document.createElement("button");
            allButton.dataset.category = "all";
            allButton.textContent = "Tous";
            allButton.classList.add("active");
            filterContainer.appendChild(allButton);
            allButton.addEventListener("click", function () {
                document.querySelectorAll("#filters button").forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
                const projets = document.querySelectorAll(".gallery figure");
                projets.forEach(projetall => {
                    projetall.style.display = "block";
                })
            })

            // Ajoute un bouton pour chaque catégorie
            categories.forEach(category => {
                const button = document.createElement("button");
                button.dataset.category = category.id;
                button.textContent = category.name;
                filterContainer.appendChild(button);
                button.addEventListener("click", function () {
                    document.querySelectorAll("#filters button").forEach(btn => btn.classList.remove("active"));
                    this.classList.add("active");
                    const projets = document.querySelectorAll(".gallery figure");
                    projets.forEach(projet => {
                        const categorieprojet = projet.dataset.category;
                        console.log(categorieprojet, category);
                        if (categorieprojet != category.id) {
                            projet.style.display = "none";
                        } else {
                            projet.style.display = "block";
                        }
                    })
                });
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                select.appendChild(option);
            });

            // Appel initial pour afficher tous les travaux
            fetchData();
        });
}

fetchCategories();
