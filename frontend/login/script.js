document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    // Toggle Password Visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = passwordInput.value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.type === "success") {
                localStorage.setItem('token', data.token);
                window.location.href = '/frontend/index.html';
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Error connecting to server");
        }
    });
});
