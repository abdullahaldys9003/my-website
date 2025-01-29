import {fetchDatePhp,findCategory} from '../module/fetch.js';


import {displayCategory} from './categories.js';


import {displayProducts} from './products.js';

import {toCart,displayCart} from './cart.js';

const containers = document.querySelectorAll(".container");

let open = document.getElementById("open");

open.addEventListener("click",() =>{ hiddenPage();
  showElement("category-page");
});


function hiddenPage() {
  containers.forEach(container => container.style.display = "none");
}

function showElement(element) {
  document.getElementById(element).style.display = "block";
}


let dataPro = null;
let categories = null;

function submitted() {
  let buttons = document.querySelectorAll(".product-button");
  
  buttons.forEach((button,i) => {
  button.addEventListener("click"
,function() {
  const id = button.dataset.elementId;
  let products = findCategory(dataPro,id);
  hiddenPage();
    
  document.getElementById("product-page").style.display ="block";
  displayProducts(products);
  addToCart();
});
});
}


function addToCart() {
  let buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((button) => {
    button.addEventListener("click"
   ,function() {
     const id = button.dataset.elementId;
      toCart(id);
      });
   });
}




async function server() {
   categories = await fetchDatePhp("get_category.php");
   displayCategory(categories);
   submitted();
   dataPro = await fetchDatePhp("get_products.php");
}

server();



let submit = document.getElementById("Cart");
submit.addEventListener("click",()=>{
     hiddenPage();
   showElement("cart-page");
   displayCart(dataPro);
});





