// Variables para manejar el carrito
let cart = [];
const cartButton = document.getElementById('cart-button');
const CartButton1 = document.getElementById('cart-button')
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const closeCartButton = document.getElementById('close-cart');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutButton = document.getElementById('checkout-button');
const paymentMessage = document.getElementById('payment-message');

// Nuevas variables para el proceso de pago
let paymentMethodsContainer;
let dynamicFieldsContainer;
let finalCheckoutButton;

// Función para actualizar el carrito
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = `$${total}`;

    //Actualiza el contador del carrtio
    const cartCount = document.getElementById('cart-count');
    cartButton.textContent = `(${cart.reduce((sum, item) => sum + item.quantity, 0)})`;

    // Añadir eventos a los botones de eliminar
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', event => {
            const productId = parseInt(event.target.dataset.id);
            removeFromCart(productId);
        });
    });
}

// Función para añadir productos al carrito
function addToCart(productId, name, price) {
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1; // Incrementar cantidad
    } else {
        cart.push({ id: productId, name, price, quantity: 1 });
    }

    updateCart();
}

// Función para eliminar productos del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Función para mostrar el formulario de métodos de pago debajo de los productos
function showPaymentMethods() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    // Buscar el contenedor donde deben mostrarse los métodos de pago (debajo de los productos)
    const productsContainer = document.querySelector('.products-container') || document.querySelector('.products');
    
    // Si no hay un contenedor específico, buscar en el main o body
    const targetContainer = productsContainer ? productsContainer.parentElement : document.querySelector('main') || document.body;
    
    // Eliminar cualquier formulario de pago existente
    const existingForm = document.getElementById('payment-methods-container');
    if (existingForm) {
        existingForm.remove();
    }
    
    // Crear el nuevo contenedor de métodos de pago
    const paymentContainer = document.createElement('div');
    paymentContainer.id = 'payment-methods-container';
    paymentContainer.className = 'payment-section';
    
    // Crear el HTML para el formulario de pago
    paymentContainer.innerHTML = `
        <h2>Métodos de Pago</h2>
        <form id="payment-form" class="payment-form">
            <div class="payment-options">
                <div class="payment-option">
                    <input type="radio" id="credit-card" name="payment-method" value="credit-card" checked>
                    <label for="credit-card">Tarjeta de crédito</label>
                </div>
                <div class="payment-option">
                    <input type="radio" id="paypal" name="payment-method" value="paypal">
                    <label for="paypal">PayPal</label>
                </div>
                <div class="payment-option">
                    <input type="radio" id="bank-transfer" name="payment-method" value="bank-transfer">
                    <label for="bank-transfer">Transferencia bancaria</label>
                </div>
            </div>
            
            <div id="dynamic-fields" class="dynamic-fields"></div>
            
            <div class="payment-actions">
                <button type="button" id="final-checkout-button" class="checkout-button">Confirmar pago</button>
                <button type="button" id="cancel-payment" class="cancel-button">Cancelar</button>
            </div>
        </form>
    `;
    
    // Insertar el contenedor después de los productos
    targetContainer.appendChild(paymentContainer);
    
    // Actualizar las referencias a los elementos
    dynamicFieldsContainer = document.getElementById('dynamic-fields');
    finalCheckoutButton = document.getElementById('final-checkout-button');
    
    // Inicializar los campos dinámicos
    updateDynamicFields('credit-card');
    
    // Scroll hasta el formulario de pago
    paymentContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Agregar los event listeners
    document.getElementById('payment-form').addEventListener('change', (e) => {
        if (e.target.name === 'payment-method') {
            updateDynamicFields(e.target.value);
        }
    });
    
    document.getElementById('final-checkout-button').addEventListener('click', () => {
        processPayment();
    });
    
    document.getElementById('cancel-payment').addEventListener('click', () => {
        paymentContainer.remove();
    });
    
    // Ocultar el carrito si está visible
    closeCart();
}

// Función para actualizar los campos dinámicos según el método de pago
function updateDynamicFields(paymentMethod) {
    if (!dynamicFieldsContainer) return;
    
    dynamicFieldsContainer.innerHTML = '';
    
    if (paymentMethod === 'credit-card') {
        dynamicFieldsContainer.innerHTML = `
            <div class="form-group">
                <label for="card-number">Número de tarjeta</label>
                <input type="text" id="card-number" name="card-number" placeholder="1234-5678-9012-3456" required>
            </div>
            <div class="form-group">
                <label for="card-name">Nombre en la tarjeta</label>
                <input type="text" id="card-name" name="card-name" placeholder="Juan Pérez" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="card-expiry">Fecha de vencimiento</label>
                    <input type="text" id="card-expiry" name="card-expiry" placeholder="MM/AA" required>
                </div>
                <div class="form-group">
                    <label for="card-cvv">CVV</label>
                    <input type="text" id="card-cvv" name="card-cvv" placeholder="123" required>
                </div>
            </div>
        `;
    } else if (paymentMethod === 'paypal') {
        dynamicFieldsContainer.innerHTML = `
            <div class="form-group">
                <label for="paypal-email">Correo electrónico de PayPal</label>
                <input type="email" id="paypal-email" name="paypal-email" placeholder="correo@ejemplo.com" required>
            </div>
        `;
    } else if (paymentMethod === 'bank-transfer') {
        dynamicFieldsContainer.innerHTML = `
            <div class="form-group">
                <label for="bank-name">Nombre del banco</label>
                <input type="text" id="bank-name" name="bank-name" required>
            </div>
            <div class="form-group">
                <label for="account-number">Número de cuenta</label>
                <input type="text" id="account-number" name="account-number" placeholder="1234567890" required>
            </div>
        `;
    }
    
    // Mostrar el botón final de checkout
    if (finalCheckoutButton) {
        finalCheckoutButton.classList.remove('hidden');
    }
}

// Función para validar los campos del método de pago
function validatePaymentForm() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    
    if (!paymentMethod) {
        alert('Por favor selecciona un método de pago');
        return false;
    }
    
    const requiredFields = dynamicFieldsContainer.querySelectorAll('input[required]');
    for (const field of requiredFields) {
        if (!field.value.trim()) {
            alert(`Por favor completa el campo: ${field.previousElementSibling.textContent}`);
            field.focus();
            return false;
        }
    }
    
    // Validaciones específicas por método de pago
    if (paymentMethod === 'credit-card') {
        const cardNumber = document.getElementById('card-number').value.replace(/\D/g, '');
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            alert('Número de tarjeta inválido');
            return false;
        }
        
        const expiry = document.getElementById('card-expiry').value;
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            alert('Formato de fecha inválido (MM/AA)');
            return false;
        }
        
        const cvv = document.getElementById('card-cvv').value;
        if (!/^\d{3,4}$/.test(cvv)) {
            alert('CVV inválido');
            return false;
        }
    }
    
    return true;
}

// Función para procesar el pago
function processPayment() {
    const paymentMethodsContainer = document.getElementById('payment-methods-container');
    
    if (paymentMethodsContainer) {
        // Si estamos en la pantalla de métodos de pago, validar primero
        if (!validatePaymentForm()) {
            return;
        }
        
        // Ocultar el formulario de métodos de pago
        paymentMethodsContainer.style.display = 'none';
    }
    
    // Vaciar el carrito
    cart = [];
    updateCart();
    
    // Mostrar mensaje de pago procesado
    if (paymentMessage) {
        paymentMessage.classList.remove('hidden');
        
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            paymentMessage.classList.add('hidden');
        }, 3000);
    } else {
        // Si no existe el elemento de mensaje, crearlo dinámicamente
        const message = document.createElement('div');
        message.id = 'payment-message';
        message.className = 'payment-success-message';
        message.innerHTML = '<p>¡Pago procesado exitosamente!</p>';
        document.body.appendChild(message);
        
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

// Event listeners para añadir productos
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const product = event.target.closest('.product');
        const productId = parseInt(product.dataset.id);
        const name = product.dataset.name;
        const price = parseFloat(product.dataset.price);

        addToCart(productId, name, price);
    });
});

// Event listeners para abrir y cerrar el carrito
cartButton.addEventListener('click', () => {
    cartModal.classList.toggle('hidden');
});

function closeCart() {
    cartModal.classList.add('hidden');
}

closeCartButton.addEventListener('click', () => {
    closeCart();

});

// Event listener para el botón de pagar
checkoutButton.addEventListener('click', () => {
    showPaymentMethods();
});