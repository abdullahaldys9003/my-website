import {findCategory} from './module/fetch.js';
import domFun from './domFun.js';

let temp = null;
let addProductPageIdHTML = document.getElementById("add-Product-Page");


  const displayProductsContainer = document.getElementById("displayProductsContainer");  
  
 
 
//let onClickButtonProduct = 
//domFun.htmlId("onClickButtonProduct");

let moodProduct = null;
let products = [];
let countdisplay = 0;

export function getProducts(product) {
    products = product;
}


export function findCategor(id) {
  if (products.length === 0) {
    return false;
  }
  
  let filterProduct = products.map((product,index) => {
     product.id = index;
    return product;
  }
    );
    
    
  return filterProduct.filter((item,index) => item.category_id == id);
}

export function deleteAll(id) {
  
 if (products.length !== 0) {
    products.forEach((product, index) => {
    product.category_id == id;
    products.splice(index, 1);
    const tableProducts = document.querySelector(".tableProducts");
    
    displayProductsContainer.removeChild(tableProducts);
  });
  } else {
    return;
  }
}


export let divForm =(`<div class="form-container">
  <form id="productForm" class="product-form">
    <div class="product-details">
     
     <div class="product-price">
      <div class="product-title">
        <input type="text" placeholder="title" id="title">
      </div>    
     
       <div class="price"> 
        <input  type="number" placeholder="price" id="price">
        </div>
        
        <div class="product-image">
        <input  type="file" id="image" placeholder="enter image URL">
        </div>
     </div>
     <br>
     <div class="x">
        <div class="product-taxes">
          <input " type="number" placeholder="taxes" id="taxes">
        </div>

        <div class="product-ads">
          <input  type="number" placeholder="ads" id="ads">
        </div>

        <div class="product-discount">
          <input  type="number" placeholder="discount" id="discount">
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
      <button  id="closeFormProduct" class="close">Close</button>
    </div>
    
  </form>
</div>`);


document.getElementById("add-Product-Page").innerHTML = divForm;


function inputsProduct() {
  
 let titleInput = document.getElementById("title");
 let priceInput = document.getElementById("price");
 
  let taxesInput = document.getElementById("taxes");
  
  let adsInput = document.getElementById("ads");
  
  let discountInput = document.getElementById("discount");
// let totalInput = document.getElementById("total");
 let countInput = document.getElementById("count");
 let imageInput = document.getElementById("image");
 
let selectedCategoryInput = document.getElementById("selectedCategory");

return {
  name :titleInput,
  price:priceInput,
  taxes:taxesInput,
  ads:adsInput,
  discount:discountInput,
  count:countInput,
  image:imageInput,
  category_id:selectedCategoryInput,
  
}
}


export function getTotal() {
  alert("babab");
  /*
  // console.log('done');
  if (priceInput.value !== "") {
    let result = +priceInput.value + +taxesInput.value + +adsInput.value - +discountInput.value;
    totalInput.innerHTML = result;
    totalInput.style.background = "#040";
  } else {
    totalInput.innerHTML = "";
    totalInput.style.background = "#a00d02";
  }
  */
} 

export function createProduct(mood) {
  
 const {
  name,
  price,
  taxes,
  ads,
  discount,
  count,
  image,
  category_id,
  } = inputsProduct();
  
  let index = category_id.value;
  if (index ==="") {
    alert("يجب ادخال الصنف اولا");
    return;
  }

  if (!name.value) {
    alert("يجب إدخال اسم الفئة");
    return false;
  }

  if (!price.value) {
    alert("يجب ادخال السعر");
    return false;
  }
  





  let newPro = {
    name: name.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
   // total: totalInput.innerHTML,
    count: count.value,
   // category: categories[index].name,
    category_id:index,
  };


alert(mood);
//  const fileImage = image.files[0];
//  newPro.image = fileImage;
  if (name.value !== "" && price.value !== "") {
    if (mood == "create") {
      products.push(newPro);
      alert("تمت الاضافه");
     document.getElementById(`category_${newPro.category_id}`).click();
    } else if (mood == "update") {
      updateProduct(newPro);
      count.style.display = "block";
    }
  } else {
    alert("يجب ادخال السعر والاسم ")
  }
//  Clear();
}




export function displayProducts(products) {
 
 
const tableProducts = document.querySelector(".tableProducts");

  if (tableProducts) {
      displayProductsContainer.removeChild(tableProducts);
  }
  
  
  if (products) {
    const tableProduct= document.createElement('table');
    tableProduct.id = "table";
    // Create the table element
    tableProduct.innerHTML = `
    <div style = "display:block,background:red,width :333px">
    
    <div>
    
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
      <tbody>
      
        ${products.map((product, index) => (
          `<tr class ="row" id ="${index}">
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>total</td>
            <td>${product.category_id}</td>
            <td>${index}</td>
            <td >
             <button" id='update_${product.id}' class = "updateProduct"> Update </button>
            </td>
            <td id ="parentdelete">
              <button  class ="deleteProduct" id ='${product.id}'>Delete</button>
            </td>
          </tr>`
        )).join('')}
    </tbody>
    `;
  
   
 const container = document.createElement("div");
  container.id = "tableProducts";
  container.classList.add("tableProducts");
   container.appendChild(tableProduct);
   
    displayProductsContainer.appendChild(container);
    
    deleteProduct();
    addEventUpdate();
  } else {
    alert("لا يوجد عرض اضناف");
  }
}





function editUpdate(index) {
  
   const {
   name,
   price,
   taxes,
   ads,
   discount,
 } = inputsProduct();
 
 
 
 name.value = products[index].name;
 price.value = products[index].price;
 taxes.value = products[index].taxes;
  ads.value = products[index].ads;
  discount.value = products[index].discount;
  
  
  
  
  //getTotal();
// count.value = dataPro[index].count;

 // updateCategoryName(dataPro[index].category_id);
  // count.style.display = "none";
}


function addEventUpdate() {
  
  const elements = document.querySelectorAll(".updateProduct");
  
  if (elements !== null) {
   elements.forEach((element,index) => {
    element.addEventListener("click",() => {
    
      domFun.showForm(addProductPageIdHTML);
     const id = element.id.slice(7,8);
      temp = id;
      editUpdate(id);
      document.getElementById("onClickButtonProduct").setAttribute("type","update");
   }
   );
   
 });
} else {
  alert("خطاء في جلب العناصر");
}
}

export function  deleteProduct() {
  const elements = document.querySelectorAll(".deleteProduct");
  
  if (elements !== null) {
   elements.forEach((element,index) => {
    element.addEventListener("click",() => {
      element.parentNode.parentNode.remove();
      products.splice(element.id,1);
        alert("تم حذف العنصر ");
        return;
   }
   );
   
 });
} else {
  alert("خطاء في جلب العناصر");
}
}

function updateProduct(newPro) {
  newPro.id = products[temp].id;
  products[temp] = newPro;
  document.getElementById(`category_${newPro.category_id}`).click();
}


/*
async function sendProductData(newPro) {
  try {
    const formData = new FormData();
    
    if (newPro.typedb == "update" || newPro.typedb == "add") {
      formData.append('image', newPro.image); 
    }
   
   
   formData.append('jsonData',JSON.stringify(newPro)); // 
     const response = await fetch('../management_files/crud_product.php', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error(`فشل الرجاء المحاوله لاحقاً: ${response.status}`);
    }
    
    const data = await response.json();
    switch (data.type) {
      case 'add':
        newPro.id = data.id;
        dataPro.push(newPro);
        return data.type;
        break;
      case 'update':
        return data.type;
        break;
      case 'delete':
        if (data.success) {
          alert("تم الحذف بنجاح");
          return data.type;
       }
      default:
        alert(data.Error);
    }
  } catch (error) {
   alert(error.message);
  }
}

function createProduct(mood) {
  let categoryId = getSelectedCategoryId();
  let index = findIndexById(categories, categoryId);

  if (!title.value) {
    alert("يجب إدخال اسم الفئة");
    return false;
  }

  if (!price.value) {
    alert("يجب ادخال السعر");
    return false;
  }

  if (!image.files[0]) {
    alert("يجب اختيار صورة للفئة");
    return false;
  }



  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: categories[index].name,
    category_id: categoryId,
  };


  const fileImage = image.files[0];
  newPro.image = fileImage;
  if (title.value !== "" && price.value !== "") {
    if (mood == "create") {
      addProduct(newPro);
    } else if (mood == "update") {
      updateProduct(newPro);
   if (true) {
     
   }   count.style.display = "block";
    }
  } else {
    alert("يجب ادخال السعر والاسم ")
  }
  Clear();
}




async function addProduct(newPro) {
  newPro.typedb = "add";
  let response = await  sendProductData(newPro);
  if (response == "add") {
    alert("تم اضافه المنتج");
  }
  
  submit.innerHTML = "Create";
  mood ="create";
 displayProduct(newPro.category_id);
}

function Clear() {
 title.value = "";
 price.value = "";
 taxes.value = "";
  ads.value = "";
  discount.value = "";
  getTotal(); // Assuming this function resets the total calculation
  count.value = "";
  updateCategoryName(""); // Assuming this function clears the category display
  count.style.display = ""; // Restore default display
  image.value = "";
 // Assuming you want to reset this variable
  tmp = ""; // If applicable
}

function editUpdate(index) {
    title.value = dataPro[index].title;
  price.value = dataPro[index].price;
  taxes.value = dataPro[index].taxes;
  ads.value = dataPro[index].ads;

  discount.value = dataPro[index].discount;
  getTotal();
 count.value = dataPro[index].count;
  updateCategoryName(dataPro[index].category_id);
  count.style.display = "none";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

async function deleteData(productId) {
  alert(productId);
  let index = findIndexById(dataPro,productId);
  alert(index);
  
  let newPro = {
    typedb: "delete",
    id: productId,
  };
  
 let result = await sendProductData(newPro);
 
 if (result == "delete") {
 let getIdCategory = dataPro[index].category_id;
  dataPro.splice(index, 1);
  displayProduct(getIdCategory);
  alert("تم حذف المتتج ");
}
}

function addTableToElement(table,productsContainer) {
   const existingTableContainer = productsContainer.querySelector('.tabcontent');
   
 if (existingTableContainer) {
   productsContainer.removeChild(existingTableContainer);
 }
 
 let container = document.createElement("tabcontent");
 container.classList.add("tabcontent");
 container.id = "tabcontent";
 productsContainer.appendChild(container);
 const table_container = document.createElement("div");
 table_container.classList.add("table-container");
 
 
 table_container.appendChild(tableProduct);



 container.appendChild(table.tableCate);
 
 container.appendChild(table_container);
 productsContainer.appendChild(container);
 }

*/
