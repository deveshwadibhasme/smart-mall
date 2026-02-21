document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productTable = document.getElementById('product-table-body');
    const orderTable = document.getElementById('order-table-body');

    let products = JSON.parse(localStorage.getItem('products')) || [];
    let orders = [
        { id: "101", customer: "John Doe", total: "$120", status: "pending" },
        { id: "102", customer: "Jane Smith", total: "$45", status: "packing" }
    ];

    // --- PRODUCT FUNCTIONS ---
    function renderProducts() {
        productTable.innerHTML = '';
        products.forEach((p, index) => {
            productTable.innerHTML += `
                <tr>
                    <td><img src="${p.img || 'https://via.placeholder.com/50'}" width="50"></td>
                    <td>${p.name}</td>
                    <td>$${p.price}</td>
                    <td>${p.stock}</td>
                    <td>${p.category}</td>
                    <td>
                        <span class="btn-edit" onclick="editProduct(${index})">Edit</span>
                        <span class="btn-delete" onclick="deleteProduct(${index})">Delete</span>
                    </td>
                </tr>
            `;
        });
        localStorage.setItem('products', JSON.stringify(products));
    }

    productForm.onsubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name: document.getElementById('p-name').value,
            price: document.getElementById('p-price').value,
            stock: document.getElementById('p-stock').value,
            category: document.getElementById('p-category').value,
            desc: document.getElementById('p-desc').value,
            img: "" // For a real app, you'd convert the file to a Base64 string or URL
        };
        products.push(newProduct);
        renderProducts();
        productForm.reset();
    };

    window.deleteProduct = (index) => {
        products.splice(index, 1);
        renderProducts();
    };

    // --- ORDER FUNCTIONS ---
    function renderOrders() {
        orderTable.innerHTML = '';
        orders.forEach((o, index) => {
            orderTable.innerHTML += `
                <tr>
                    <td>#${o.id}</td>
                    <td>${o.customer}</td>
                    <td>${o.total}</td>
                    <td><span class="status-badge ${o.status}">${o.status}</span></td>
                    <td>
                        <select onchange="updateStatus(${index}, this.value)">
                            <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="packing" ${o.status === 'packing' ? 'selected' : ''}>Packing</option>
                            <option value="packed" ${o.status === 'packed' ? 'selected' : ''}>Packed</option>
                        </select>
                    </td>
                </tr>
            `;
        });
    }

    window.updateStatus = (index, newStatus) => {
        orders[index].status = newStatus;
        renderOrders();
    };

    renderProducts();
    renderOrders();
});