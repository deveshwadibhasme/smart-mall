// script.js
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect values
    const formData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value
    };

    // Log data to console (replace this with your API call)
    console.log("Form Submitted Successfully:", formData);

    // Visual feedback
    alert(`Thank you, ${formData.name}! Your information has been received.`);
    
    // Optional: Reset form
    // this.reset();
});
