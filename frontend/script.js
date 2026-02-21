const inventory = {
    "Dairy, Bread & Eggs": [
        { id: 1, name: "Amul Taaza Milk", qty: "500 ml", price: 28, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y6P2Xk4P-7V0nS1xL-pQ9UvJ8L8Z3xHw6A&s" },
        { id: 2, name: "Amul Masti Curd", qty: "400 g", price: 35, img: "https://m.media-amazon.com/images/I/71Y0Yp-YtGL._SL1500_.jpg" },
        { id: 3, name: "Brown Bread", qty: "400 g", price: 50, img: "https://m.media-amazon.com/images/I/61Nl-H6V+rL._SL1000_.jpg" }
    ],
    "Snacks & Munchies": [
        { id: 1, name: "Lays Classic", qty: "50 g", price: 20, img: "https://m.media-amazon.com/images/I/71-081y+6uL._SL1500_.jpg" },
        { id: 2, name: "Choco Dips", qty: "100 g", price: 40, img: "https://m.media-amazon.com/images/I/61CExB9zW4L._SL1100_.jpg" },
        { id: 3, name: "Roasted Almonds", qty: "200 g", price: 250, img: "https://m.media-amazon.com/images/I/71V9XoN+WnL._SL1500_.jpg" }
    ],
    "Cold Drinks & Juices": [
        { id: 1, name: "Coca Cola", qty: "750 ml", price: 45, img: "https://m.media-amazon.com/images/I/51v8ny526GL._SL1000_.jpg" },
        { id: 1, name: "Real Orange Juice", qty: "1 L", price: 110, img: "https://m.media-amazon.com/images/I/71BvYv6iV9L._SL1500_.jpg" }
    ]
};

const sectionContainer = document.getElementById('category-sections');

function renderSmartMart() {
    let html = '';

    for (const category in inventory) {
        html += `
            <section class="category-block">
                <div class="category-header">
                    <h2>${category}</h2>
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
                                <button class="add-btn" onclick="addtoCart()">ADD</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
          
        `;
    }
    sectionContainer.innerHTML = html;
}

renderSmartMart();