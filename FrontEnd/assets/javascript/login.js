document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    errorDiv.textContent = ''; //Effacer le message d'erreur précédent

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Problème de connexion. Veuillez vérifier vos informations.');
        }

        const data = await response.json();

        //Connexion réussi, stocker le jeton de connexion
        localStorage.setItem('authToken', data.token);

        //Redirection ver index.html
        window.location.href = './index.html';
    } catch (error) {
        errorDiv.textContent = error.message;
    }
});