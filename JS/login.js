function Iniciar() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    fetch('http://localhost:3001/api/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.User[0] === undefined) {
                Registrar(username, password)
            }
            else {
                SignIn(username, password)
            }
        })
        .catch(error => {
            console.error('Error:', error); // Manejar errores
        });

}

function Registrar(username, pass) {
    fetch('http://localhost:3001/api/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            displayName: 'admin',
            password: pass,
            admin: true
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.token) {
                localStorage.setItem('token', data.token)
                window.location.href = 'admin.html';
            }
        })
        .catch(error => {
            console.error('Error:', error); // Manejar errores
        });
}
function SignIn(username, pass) {
    fetch('http://localhost:3001/api/signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            displayName: 'admin',
            password: pass,
            admin: true
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 1) {
                console.log(data);
                localStorage.setItem('token', data.token)
                window.location.href = 'admin.html';
            } else {
                alert('Usted no es admin o credenciales incorrectas')
            }
        })
        .catch(error => {
            console.error('Error:', error); // Manejar errores
        });

}