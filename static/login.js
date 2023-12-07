document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    fetch('/login', {  // Make sure the URL matches your server's
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to login');
        }
    })
    .then(data => {
        alert(data.message);
        window.location.href = "/dashboard"; // Redirects to a new page on successful login
    })
    .catch(error => {
        alert(error.message);
    });
});

