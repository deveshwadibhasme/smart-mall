// script.js
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect values
    const formData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value
    };

    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/api/auth/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            number: formData.phone,
            address: formData.address,
            city: formData.city,
            password: password
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.type === "success") {
                alert("Registration successful! Redirecting to login...");
                window.location.href = '../login/index.html';
            } else {
                alert(data.message || "Registration failed");
            }
        })
        .catch(error => {
            console.error("Signup Error:", error);
            alert("Error connecting to server");
        });


    // Visual feedback
    alert(`Thank you, ${formData.name}! Your information has been received.`);

    // Optional: Reset form
    // this.reset();
});
