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
               
            }
        })
}

// Appel la fonction
fetchData();