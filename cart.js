document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartTab = document.querySelector('.carttab');
    const cartCount = document.querySelector('.cart');
    const orderConfirmed = cartTab.querySelector('h1');
    const cartItems = cartTab.querySelector('.listcart');
    const cartTotal = document.createElement('div');
    cartTotal.classList.add('cart-total');

    // Update cart count
    function updateCartCount() {
        cartCount.textContent = `Your Cart (${cart.length})`;
    }

    // Show cart items
    function updateCartDisplay() {
        cartItems.innerHTML = ''; // clear existing cart items
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('item');
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="name">${item.name}</div>
                <div class="totalprice">$${item.price.toFixed(2)}</div>
                <div class="Quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            cartItems.appendChild(cartItem);
            totalPrice += item.price * item.quantity;

            // Add functionality to quantity buttons
            cartItem.querySelector('.minus').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    updateCartDisplay();
                }
            });

            cartItem.querySelector('.plus').addEventListener('click', () => {
                item.quantity++;
                updateCartDisplay();
            });
        });

        // Update total price
        cartTotal.innerHTML = `<h3>Total Price: $${totalPrice.toFixed(2)}</h3>`;
        cartItems.appendChild(cartTotal);
    }

    // Add to cart functionality
    document.querySelectorAll('.add').forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                img: button.closest('.item').querySelector('img').src,
                name: button.closest('.item').querySelector('.name').textContent,
                price: parseFloat(button.closest('.item').querySelector('.price').textContent.replace('$', '')),
                quantity: 1
            };
            
            // Check if the item is already in the cart
            const existingItem = cart.find(cartItem => cartItem.name === item.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(item);
            }
            
            updateCartCount();
            updateCartDisplay();
        });
    });

    // Show order confirmed message when clicking checkout
    document.querySelector('.btn').addEventListener('click', () => {
        if (cart.length > 0) {
            orderConfirmed.textContent = "Order Confirmed";
            alert("Your order has been confirmed. Enjoy your meal!");
        } else {
            alert("Your cart is empty!");
        }
    });

    // Initialize cart display
    updateCartCount();
    updateCartDisplay();
});


