
import domFun from './domFun.js';

class ProductManager {
  constructor() {
    this.products = [];
    this.temp = null;
    this.moodProduct ="create";
    this.countDisplay = 0;
    this.displayProductsContainer = document.getElementById("displayProductsContainer");
    this.addProductPageIdHTML = document.getElementById("add-Product-Page");
    this.renderForm();
  }

  renderForm() {
    const formHTML =`
      <form id="productForm" class="product-form">
        <div class="product-details">
          <div class="product-price">
            <div class="product-title">
              <input type="text" placeholder="title" id="title">
            </div>    
            <div class="price"> 
              <input type="number" placeholder="price" id="price">
            </div>
            <div class="product-image">
              <input type="file" id="image" placeholder="enter image URL">
            </div>
          </div>
          <br>
          <div class="x">
            <div class="product-taxes">
              <input type="number" placeholder="taxes" id="taxes">
            </div>
            <div class="product-ads">
              <input type="number" placeholder="ads" id="ads">
            </div>
            <div class="product-discount">
              <input type="number" placeholder="discount" id="discount">
            </div>
          </div>
          <div class="product-total">
            <label for="total">Total</label>
            <small id="total"></small>
          </div>
        </div>
        <br>
        <div class="product-category">
          <select id="selectedCategory">
            <option value="">Choose a Category</option>
          </select>
        </div>
        <div class="product-quantity">
          <input type="number" placeholder="quantity" id="count" value="1">
        </div>
        <div class="form-buttons">
          <button id="onClickButtonProduct" class="create">create</button>
          <button id="closeFormProduct" class="close">Close</button>
        </div>
      </form>
    `;
   
const newElement = document.createElement('div');
newElement.innerHTML = formHTML;
newElement.classList.add("form-container");

// إضافة العنصر كأول ابن داخل العنصر الأب
this.addProductPageIdHTML.prepend(newElement);

   // this.addProductPageIdHTML.innerHTML = formHTML;
  }

 
  getInputs() {
    return {
      name: document.getElementById("title").value,
      price: document.getElementById("price").value,
      taxes: document.getElementById("taxes").value,
      ads: document.getElementById("ads").value,
      discount: document.getElementById("discount").value,
      count: document.getElementById("count").value,
      image: document.getElementById("image").value,
      category_id: document.getElementById("selectedCategory").value,
    };
  }

  addProduct(product) {
    this.products.push(product);
    alert("Product added successfully!");
  }

  findCategory(id) {
    return this.products.filter((product) => product.category_id == id);
  }

  deleteAll(id) {
    this.products = this.products.filter((product) => product.category_id != id);
    const tableProducts = document.querySelector(".tableProducts");
    if (tableProducts) {
      this.displayProductsContainer.removeChild(tableProducts);
    }
  }

  displayProducts(products) {
    const tableProducts = document.querySelector(".tableProducts");
    if (tableProducts) {
      this.displayProductsContainer.removeChild(tableProducts);
    }

    const table = document.createElement("table");
    table.id = "table";
    table.innerHTML = `
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Taxes</th>
        <th>Ads</th>
        <th>Discount</th>
        <th>Total</th>
        <th>Category ID</th>
        <th>ID</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
      ${products.map((product, index) => `
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.taxes}</td>
          <td>${product.ads}</td>
          <td>${product.discount}</td>
          <td>${+product.price + +product.taxes + +product.ads - +product.discount}</td>
          <td>${product.category_id}</td>
          <td>${index}</td>
          <td><button class="updateProduct" data-id="${index}">Update</button></td>
          <td><button class="deleteProduct" data-id="${index}">Delete</button></td>
        </tr>`).join('')}
    `;
    const container = document.createElement("div");
    container.classList.add("tableProducts");
    container.appendChild(table);
    this.displayProductsContainer.appendChild(container);
      this.addEventListeners();
  }
  
  addEventListeners() {
    document.querySelectorAll(".deleteProduct").forEach(button => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        this.products.splice(id, 1);
        this.displayProducts();
      });
    });

    document.querySelectorAll(".updateProduct").forEach(button => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        this.editProduct(id);
      });
    });
  }

  editProduct(index) {
    const inputs = this.getInputs();
    const product = this.products[index];
    inputs.name.value = product.name;
    inputs.price.value = product.price;
    inputs.taxes.value = product.taxes;
    inputs.ads.value = product.ads;
    inputs.discount.value = product.discount;
    inputs.count.value = product.count;
    inputs.category_id.value = product.category_id;
    this.temp = index;
  }
  
  processProduct(category) {
    let productInputs = this.getInputs();
      if (this.moodProduct === "update") {
       // this.updateCategory(categoryInputs, this.tempId);
      } else if (this.moodProduct === "create") {
         productInputs.type = "add";
         this.products.push(productInputs);
         alert(this.products);
      }
  }
  addTab() {
    const menutab = document.getElementById("menutab");
     const tab = document.getElementById("tab");

    menutab.addEventListener("click", () => {
      if (tab.style.display === "none") {
        domFun.showElement(tab);
      } else {
        domFun.hideElement(tab);
      }
    });
  }
  
  openCategory(element, id) {
  const productfilters=this.findCategory(id);
  this.displayProducts(productfilters);
  }
  
  
  tablink(category) {
    const existingTableContainer =document.querySelector(".tab");
    
    if (existingTableContainer) {
      this.addProductPageIdHTML.removeChild(existingTableContainer);
    }

    const tabContainer = document.createElement("div");
    
    tabContainer.classList.add("tab");
    tabContainer.id = "tab";

    category.forEach((category, index) => {
      const tabButton = document.createElement("button");
      tabButton.classList.add("tablinks");
      tabButton.textContent = category.name;
      tabButton.id = `category_${index}`;
      tabContainer.appendChild(tabButton);
    });

    this.addProductPageIdHTML.appendChild(tabContainer);
    
    document.querySelectorAll(".tablinks").forEach((button) => {
      button.addEventListener("click", () => {
         const id = button.id.split("_")[1];
        alert (id);
         this.openCategory(button, id);
      });
    });

/*   document.getElementById(`category_${id}`).click();*/
  }
  
  createCategoryOptions(category) {
    const categorySelect = document.getElementById("selectedCategory");
     categorySelect.innerHTML = "";

    category.forEach((category, i) => {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = category.name;
       categorySelect.appendChild(option);
    });
  }

 updateProduct(updatedProduct) {
    this.products[this.temp] = updatedProduct;
    alert(updatedProduct);
    this.displayProducts();
  }
 
 displayProductsById(id){
    alert(id);
  }
  
 addToProduct(category) {
 let onClickButtonProduct = document.getElementById("onClickButtonProduct");
    this.createCategoryOptions(category);
    this.tablink(category); 
    this.addTab();
    this.displayProducts(this.products);
   onClickButtonProduct.textContent = "create";
   onClickButtonProduct.addEventListener("click", (event) => {
     event.preventDefault();
     this.processProduct(category);
     this.displayProducts(this.products);

  });
}

}

// تصدير الكلاس
export default ProductManager;




