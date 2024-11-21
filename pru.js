// Aca se hace el login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    
    
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    

    document.getElementById('userDisplay').textContent = username;
});

//El carrusel
let currentPosition = 3;
const slider = document.getElementById('categoriesSlider');
const cardWidth = 216; 
const visibleCards = Math.floor(slider.parentElement.offsetWidth / cardWidth);
const maxPosition = (-(Math.floor(slider.children.length - visibleCards) * cardWidth)/2) + 3;

function slideCategories(direction) {
    if (direction === 'next' && currentPosition > maxPosition) {
        currentPosition -= cardWidth;
    } else if (direction === 'prev' && currentPosition < 0) {
        currentPosition += cardWidth;
    }
    slider.style.transform = `translateX(${currentPosition}px)`;

    console.log(maxPosition);
    console.log(currentPosition);
}


class ShoppingCart {
    constructor() {
        this.items = [];
        this.cartCountElement = document.getElementById('cart-count');
        this.cartItemsList = document.getElementById('cartItemsList');
        this.cartTotalElement = document.getElementById('cartTotalPrice');
        this.cartEmptyMessage = document.getElementById('cartEmptyMessage');
    }

    addItem(product) {
        
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            
            existingItem.quantity++;
        } else {
            
            this.items.push({ ...product, quantity: 1 });
        }

        
        this.updateCart();
    }

    removeItem(productId) {
        
        this.items = this.items.filter(item => item.id !== productId);

        
        this.updateCart();
    }

    updateCart() {
        this.cartItemsList.innerHTML = '';  // Limpiar la lista de items
    
        let total = 0;  // Inicializar el total a 0
    
        if (this.items.length > 0) {  // Si hay items en el carrito
            this.cartEmptyMessage.style.display = 'none';  // Ocultar el mensaje de carrito vacío
            this.cartItemsList.style.display = 'block';    // Mostrar la lista de items
    
            // Recorrer los items y agregar al carrito
            this.items.forEach(item => {
                const cartItemElement = document.createElement('li');
                cartItemElement.textContent = `${item.name} - ${item.quantity} x $${item.price.toFixed(2)}`;
    
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', () => this.removeItem(item.id));
    
                cartItemElement.appendChild(removeButton);
                this.cartItemsList.appendChild(cartItemElement);
    
                total += item.price * item.quantity;  // Sumar el precio total de los items
            });
    
            this.cartCountElement.textContent = this.items.length;  // Mostrar la cantidad de items en el carrito
            this.cartTotalElement.textContent = `$${total.toFixed(2)}`;  // Mostrar el total calculado
    
        } else {  // Si no hay items en el carrito
            this.cartEmptyMessage.style.display = 'block';  // Mostrar mensaje de carrito vacío
            this.cartItemsList.style.display = 'none';  // Ocultar la lista de items
    
            this.cartCountElement.textContent = 0;  // Asegurar que el contador de items sea 0
            this.cartTotalElement.textContent = '$0.00';  // Asegurar que el total sea 0 cuando el carrito está vacío
        }
    }
    
}


const shoppingCart = new ShoppingCart();


const products = [
    { id: 1, name: 'Laptop Pro 2024', price: 1500000, image: 'https://tse3.mm.bing.net/th?id=OIP.xAdn_fLxGH0Wt5DGiOqAJAHaGC&pid=Api&P=0&h=180' },
    { id: 2, name: 'Samsung S24 Ultra', price: 1000000, image: 'https://fdn.gsmarena.com/imgroot/news/24/01/samsung-galaxy-s24-ultra-what-to-expect/-1200x900m/gsmarena_002.jpg' },
    { id: 3, name: 'Adidas Campus Black', price: 180000, image: 'https://imgs.search.brave.com/3IeANs-Hh3k-yoRINWaz69SXyF4FSsMVuLFd5E8_e4g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGlnaXRhbHNwb3J0/LmNvbS5hci9maWxl/cy9wcm9kdWN0cy81/Y2IwYzIwODU3ZGJj/LTQ1MTkyMS01MDB4/NTAwLmpwZw' },
    { id: 4, name: 'Razer Kraken Pro V2', price: 150000, image: 'https://arsonyb2c.vtexassets.com/arquivos/ids/362074/PlayStation-5-DualShock.jpg?v=638162215101070000' },
    { id: 5, name: 'Play Station 5', price: 700000, image: 'https://imgs.search.brave.com/ArZzhNvXLF1_QSYx3Y0L9X1jTRQO5HMY5K6V_tJbS0M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/NjAxMzctTUxBNzQ2/NTE4OTA1NThfMDIy/MDI0LUYud2VicA' },
    { id: 6, name: 'Cortadora de cesped Black Decker', price:800000, image: 'https://fdn.gsmarena.com/imgroot/news/24/01/samsung-galaxy-s24-ultra-what-to-expect/-1200x900m/gsmarena_002.jpg' },
    { id: 7, name: 'Pelota de Futbol original', price: 200000, image: 'https://imgs.search.brave.com/3IeANs-Hh3k-yoRINWaz69SXyF4FSsMVuLFd5E8_e4g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGlnaXRhbHNwb3J0/LmNvbS5hci9maWxl/cy9wcm9kdWN0cy81/Y2IwYzIwODU3ZGJj/LTQ1MTkyMS01MDB4/NTAwLmpwZw' },
    { id: 8, name: 'Somier 2 plazas', price: 1300000, image: 'https://arsonyb2c.vtexassets.com/arquivos/ids/362074/PlayStation-5-DualShock.jpg?v=638162215101070000' },
];


const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const product = products[index]; 
        shoppingCart.addItem(product); 
    });
});
