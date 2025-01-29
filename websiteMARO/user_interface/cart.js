
export function toCart(productId) {
  const cartItems = getCartItems();
  
  if (isProductInCart(productId, cartItems)) {
    alert("العنصر موجود في السله");
    return;
  }

  cartItems.push(productId);
  document.getElementById("Cart").textContent =cartItems.length;
  saveCartItems(cartItems);
  alert("تمت الاضافه الى السله")
}


function getCartItems() {
  const cartItemsString = localStorage.getItem("cart");
  return cartItemsString ? JSON.parse(cartItemsString) : [];
}

function isProductInCart(productId, cartItems) {
  return cartItems.some(id => id == productId);
}


function saveCartItems(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function deleteElement(id) {
const cart = getCartItems();
const elementToRemove = id;
const elementIndex = cart.indexOf(elementToRemove);
if (elementIndex != -1) {
    cart.splice(elementIndex, 1);
   saveCartItems(cart);
  document.getElementById("Cart").textContent =cart.length;
    alert('Element deleted successfully');
} else {
    alert('Element not found in the array');
}
}

export function displayCart(dataPro) {
 let productsContainer = document.getElementById("cart");
 
 const existingTableContainer = productsContainer.querySelector('.parent-cart');
 
 if (existingTableContainer) {
  productsContainer.removeChild(existingTableContainer);
 }

  let getCart = localStorage.getItem("cart");
  
  const cart = JSON.parse(getCart);
  const productElement = document.createElement('div');
  productElement.classList.add("parent-cart");
  productElement.id = "parent-cart";
  for (const cartID of cart) {
    for (const product of dataPro) {
      if (product.id == cartID) {
        const dataURI = `data:image/jpg;base64,${product.img}`;
        productElement.innerHTML += `
    <div class="cart" id="cart-item${product.id}">
    
      <div class="container">
        <center>
          <div class="image-container img">
            <img src="${dataURI}" class="image">
          </div>
        </center>
        <p class="title">${product.title}</p>
        <p class="titl">$ ${product.price}</p>
      <div class="buttons">
      
     <button class="product-button remove-cart" id ="remove-cart" data-element-id="${product.id}">remove</button>
     
     <button class="product-button" >شراء</button>
        </div>
      </div>
    </div>
    `;
      }
    }
  }
  
  document.getElementById("cart").appendChild(productElement);
   buttonRemoveCart();

    const cartlen = getCartItems();
   document.getElementById("Cart").textContent = cartlen.length;

}




function buttonRemoveCart() {
  let buttonsRemoveCart  = document.querySelectorAll(".remove-cart");

  buttonsRemoveCart.forEach((button) => {
    button.addEventListener("click",() => {
           const id = button.dataset.elementId;
            removeCart(id);
    });
  });
}


function removeCart(id) {
 const parent= document.getElementById("parent-cart");
  const elementToDelete = document.getElementById(`cart-item${id}`);
  parent.removeChild(elementToDelete);
  deleteElement(id);
}


