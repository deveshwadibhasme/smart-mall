document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productTable = document.getElementById('product-table-body');
    const orderTable = document.getElementById('order-table-body');

    let products = [];
    let orders = [
        { id: "101", customer: "John Doe", total: "$120", status: "pending" },
        { id: "102", customer: "Jane Smith", total: "$45", status: "packing" }
    ];

    async function renderProducts() {
        try {
            const res = await fetch('http://localhost:5000/api/data/product/all-products');
            const data = await res.json();
            products = data.products || [];
            productTable.innerHTML = '';
            products.forEach((p) => {
                productTable.innerHTML += `
                <tr>
                    <td><img src="${p.image || 'https://via.placeholder.com/50'}" width="50"></td>
                    <td>${p.name}</td>
                    <td>${p.price}</td>
                    <td>${p.stock}</td>
                    <td>${p.category}</td>
                    <td>
                        <button class="btn-edit" data-id="${p._id}">Edit</button>
                        <button class="btn-delete" data-id="${p._id}">Delete</button>
                    </td>
                </tr>
            `;
            });
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    }

    productForm.onsubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', document.getElementById('p-name').value);
        formData.append('price', document.getElementById('p-price').value);
        formData.append('stock', document.getElementById('p-stock').value);
        formData.append('category', document.getElementById('p-category').value);
        formData.append('description', document.getElementById('p-desc').value);

        const imageFile = document.getElementById('p-image').files[0];
        if (imageFile) formData.append('image', imageFile);

        await fetch('http://localhost:5000/api/data/product/upload', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                renderProducts();
            })
            .catch(err => console.error('Error uploading product:', err));

        // productForm.reset();
    };

    productTable.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        if (!id) return;

        if (e.target.classList.contains('btn-delete')) {
            deleteProduct(id);
        } else if (e.target.classList.contains('btn-edit')) {
            editProduct(id);
        }
    });

    window.editProduct = (id) => {
        const product = products.find(p => p._id === id);
        alert('Edit functionality for: ' + product.name + '. You can now populate the form with this data.');
    };

    window.deleteProduct = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await fetch(`http://localhost:5000/api/data/product/remove-product/${id}`, {
                method: 'DELETE'
            })
                .then(() => renderProducts())
                .catch(err => console.error('Error deleting product:', err));
        }
    };

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