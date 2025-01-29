export function displayProducts(products) {
  
let productsContainer = document.getElementById("productId");

 const existingTableContainer = productsContainer.querySelector('.categoryCard');
 
 if (existingTableContainer) {
  productsContainer.removeChild(existingTableContainer);
 }


 let  productCard = document.createElement("div");
 
 productCard.classList.add("categoryCard");
 
  products.forEach(product => {
    
  const dataURI = `data:image/jpg;base64,${product.img}`; 
    productCard.innerHTML += `
    <div class="card products">
      <div class="container">
        <center>
          <div class="image-container img">
            <img src="${dataURI}" class="image">
          </div>
        </center>
        <p class="title">${product.title}</p>
        <p class="titl">$ ${product.price}</p>
      <div class="buttons">
     <button class="add-to-cart" data-element-id="${product.id}">add to cart</button> 
     <button class="product-button" id ="button-details">details</button>
        </div>
      </div>
    </div>
    `;
  });
  
  document.getElementById("productId").appendChild(productCard);
};
