

const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '/frontend/login';
}



let inventory = {};

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/data/product/all-products');
        const data = await response.json();

        if (data.type === "success") {
            // Group products by category
            inventory = data.products.reduce((acc, product) => {
                const category = product.category.split("-").join(" ") || "General";
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push({
                    name: product.name,
                    price: product.price,
                    qty: product.stock,
                    img: product.image || 'https://via.placeholder.com/150'
                });
                return acc;
            }, {});

            renderSmartMart();
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchProducts);


const sectionContainer = document.getElementById('category-sections');

function renderSmartMart() {
    let html = '';

    for (const category in inventory) {
        html += `
            <section class="category-block">
                <div class="category-header">
                    <h2 class="category-title">${category}</h2>
                    <a href="#" class="see-all">see all</a>
                </div>
                <div class="product-row">
                    ${inventory[category].map(item => `
                        <div class="product-card">
                            <div class="img-container">
                                <img src="${item.img}" alt="${item.name}">
                            </div>
                            <div class="product-name">${item.name}</div>
                            <div class="product-qty">${item.qty}</div>
                            <div class="price-box">
                                <span class="price">₹${item.price}</span>
                                <button class="add-btn">ADD</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
          
        `;
    }
    sectionContainer.innerHTML = html;
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach((button, index) => {
        button.addEventListener('click', async () => {
            // Find the product data associated with this button
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.price').textContent.replace('₹', '');

            const orderData = {
                productName: productName,
                price: productPrice,
                quantity: 1,
                // In a real app, you'd get the userId from local storage or session
                userId: "guest_user"
            };

            try {
                const response = await fetch('http://localhost:5000/api/data/order/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });

                const result = await response.json();
                if (response.ok) {
                    alert(`${productName} added to cart!`);
                } else {
                    alert('Failed to add product: ' + result.message);
                }
            } catch (error) {
                console.error('Error creating order:', error);
                alert('Error connecting to server');
            }
        });
    });

}

renderSmartMart();