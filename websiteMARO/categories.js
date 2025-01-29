import domFun from './domFun.js';
//import {findCategor,displayProducts,deleteAll} from './products.js';

import ProductManager from './product.js';





let onClickButtonCategory= document.getElementById("buttonCategory");



let addCategoryPageIdHTMl = document.getElementById("add-Category-Page");

const showProductsPageIdHTML = document.getElementById("show-Products-Page");

let category = [];


function deleteCategory(id) {
  
 const categoryElement = document.getElementById("deleteCategory");
  
  if (categoryElement === null) {
    alert("خطاء في الحذف");
    return;
  }
  
  
categoryElement.addEventListener("click",function () {
  
   let name =  document.getElementById(`category_${id}`);
      name.remove();
      let exetableCate = document.querySelector('.tableCate').remove();
       category.splice(id,1);
       productManager.deleteAll(id);
});
}


 function openCategory(element,id) {
   
   updateCategoryName(id);
  let tableCategory = showTableCategory(id,category);
  
 let exetableCate = document.querySelector('.tableCate');
 
 let displayCategoryContainer = document.getElementById("displayCategoryContainer");
 
 if (exetableCate) {
   displayCategoryContainer.removeChild(exetableCate);
 }

  displayCategoryContainer.appendChild(tableCategory);
     deleteCategory(id);
     addEventUpdateCategory();
   const products = productManager.findCategor(id);
  
  if (!products) {
    return;
  }
  
   productManager.displayProducts(products);
}


function addTab() {
  let menutab = document.getElementById("menutab");
  let tab = document.getElementById("tab");
  
  menutab.addEventListener("click", () => {
    if (tab.style.display == "none") {
     domFun.showElement(tab);
    } else {
      domFun.hideElement(tab);
    }
  });
}

function categoryInputs() {
  
  const nameInput = document.getElementById("categoryName");
  
  const descriptionInput = document.getElementById("categoryDescription");
 
  const imageInput  = document.getElementById("imageCategory");
  
  const inputData = {
    nameInput:nameInput,
    descriptionInput:descriptionInput,
    imageInput:imageInput
  }
  return inputData;
}


function categoryInputValue() {
 
const {nameInput,descriptionInput,imageInput} = categoryInputs();

 const inputData = {
    name:nameInput.value,
    description:descriptionInput.value,
    image:imageInput.files[0]
  }
  return inputData;
  
}

const api = {
  makeRequest(method, url, newCategory) {
    return fetch(url, {  //
      method,
      body:newCategory,
    });
  },
  
  
   createItem(itemData,url) {
    return this.makeRequest('POST',url, itemData);
  },


  updateItem(itemData,url) {
    return this.makeRequest('POST',url,itemData);
  },
  
  deleteItem(itemData, url) {
    return this.makeRequest('POST', url, itemData);
  },
};

function check(categoryData) {
  const {name,description,image} = categoryData;
  
  
  if (name == null || name == undefined) {
     alert("يجب إدخال اسم الفئة");
     return false;
  }
  
  if (!isNaN(name)) {
  alert("يجب أن يكون  اسم الفئة نصيًا");
  return false;
}



  if (description == null || description == undefined) {
    alert("يجب إدخال وصف الفئة");
    return false;
  }
  
  if (!isNaN(description)) {
    alert("يجب  ان يكون وصف الصنف  نصيا");
    return false;
  }

} 


export function prossesCategory(submit) {
  let  categoryInputs = categoryInputValue();
  
  if (check(categoryInputs) !== false) {
   if (submit == "update") {
    updateCategory(newCategory,tempId);
    
   } else if (submit == "create") {
     categoryInputs.type ="add";
      let category = createCategory(categoryInputs);
  }
 } else {
   return;
 }
}



export function createCategory(newCategory) {
  
 const { name, description,image,type } = newCategory;
 
 const data = {
   name,
   description,
   type,
 }


if (category.length !== 0) {
  
  const index = category.findIndex((itemData) => itemData.name === name);
  
  if (index !== -1) {
    alert("الصنف موجود ");
  }
  
} else {
   category.push(data);
   const id = category.findIndex((itemData) => itemData.name === name);
   createCategoryOptions(category);
   tablink(category, id);
   //dC(category);
   alert("تمت الاضافه");
   }
  
}
  
 

 

export function tablink(categories,id) {
  
  const existingTableContainer = showProductsPageIdHTML.querySelector(".tab");
  
  
 if (existingTableContainer) {
   showProductsPageIdHTML.removeChild(existingTableContainer);
 }
 
 const tabContainer = document.createElement("div");
   
  tabContainer.classList.add("tab");
  tabContainer.id = "tab";
  
    categories.forEach((category,index) => {
       // Create tab button
       const tabButton = document.createElement("button");
       tabButton.classList.add("tablinks");
       tabButton.textContent = category.name;
       tabButton.id =`category_${index}`;

       tabContainer.appendChild(tabButton);
     });
     
  showProductsPageIdHTML.appendChild(tabContainer);
  
   addTab();
 
 document.querySelectorAll('.tablinks').forEach(button => {
  button.addEventListener("click",() => {
    const id = button.id.slice(9,10);
     openCategory(button,id);
 });
});

    document.getElementById(`category_${id}`).click();
    
    
 }
 
 

export function clearCategory(){
 const {nameInput,descriptionInput,imageInput} = categoryInputs();
 nameInput.value ="";
 descriptionInput.value ="",
 imageInput.value =" ";
 }

export function addEventLinck(showByCategoryName) {
  const tabButtons = document.querySelectorAll(".tablinks");
  
   tabButtons.forEach((button) => {
    button.addEventListener("click", function() {
      openCategory(this,button.id);
    });
  });
  
}


export function showTableCategory(categoryId,categories) {
  
  let div = document.createElement("div");
  
  let table = " ";
  table = `<div class = "nameCaregory" id ="nameCategory"> ${categories[categoryId].name}</div>
  <div class = "descriptionCategory" id ="descriptionCategory"> ${categories[categoryId].description}</div> 
  <div class = "button-category">
  <button id = "deleteCategory" data-id ="${categoryId}">deletCategory</button>
 <button id="buttonUpdateCategory" data-id="${categoryId}"> Update</button >
  </div>
  `;
  
  div.innerHTML = table;
  div.classList.add("tableCate");
  div.id = "idCategory";
  return div;
}


export function createCategoryOptions(categories) {
  if (categories) {
  const categorySelect = document.getElementById("selectedCategory");
   categorySelect.innerHTML = "";  
  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = categories[i].name;
    categorySelect.appendChild(option);
  }
} else {
    alert("لا يوجد لصناف");
  }
}
 


function updateCategoryName(id) {
  const productCategory = document.getElementById('selectedCategory');

  for (let i = 0; i < productCategory.options.length; i++) {
    if (productCategory.options[i].value === id) {
      productCategory.selectedIndex = i;
      productCategory.value = id;
      break;
    }
  }
}


function addEventUpdateCategory() {
  
  const element = document.querySelector("#buttonUpdateCategory");
  
  if (element !== null) {
   element.addEventListener("click",() => {
     domFun.showForm(addCategoryPageIdHTMl);
     const id = element.getAttribute("data-id");
       editUpdate(id);
      const categoryButton
      document.getElementById("buttonCategory");
       categoryButton.setAttribute("type","update");
       categoryButton.setAttribute("data-id",`${id}`);
       category.textContent ="Update";
   });
   
} else {
  alert("خطاء في جلب العناصر");
}
}


function updateCategory() {
 const id  = category[id].id;
  products[temp] = newPro;
  document.getElementById(`category_${newPro.category_id}`).click();
}



function editUpdate(id){
   const { nameInput, descriptionInput} = categoryInputs();
   nameInput.value = category[id].name;
   descriptionInput.value = category[id].description;
};


/*
if (!confirm("Are you sure you want to delete this category?")) {
  return; // Exit if user cancels
}

 
  let deletData = {
    type,
    id,
  };
  
 try {
let response = await api.deleteItem(deletData, "../management_files/crud_category.php");
 const data = await response.json();
 if(data.type == "delete"){
   alert("تم حذف المنتج");
 }
 
  dataPro.forEach((product, index) => {
      if (product.category_id == categoryId) {
        dataPro.splice(index, 1);
      }
    });
    
   const index = findIndexById(categories,categoryId);
    categories.splice(index, 1);
    
  let removeElement = productsContainer.querySelector('.tabcontent');
  
  productsContainer.removeChild(removeElement);
  
 tablink();
 createCategoryOptions();
 
} catch(error) {
}
*/

/*

const index = findIndexById(categories, categoryId);


*/
//createCategoryNavigationTabs();
/*

//__________



function createCategoryNavigationTabs() {
   const contentSection = document.createElement("div");
   contentSection.classList.add("tabcontent");   contentSection.id = "tabcontent";
  document.getElementById("products-container").appendChild(contentSection);
  
}



function showTableCategory(categoryId) {
 
 const index =  findIndexById(categories,categoryId);
 
 let div = document.createElement("div");
 
  let table = " ";
  table = `<div class = "nameCaregory" id ="nameCategory"> ${categories[index].name}</div>
  <div class = "descriptionCategory" id ="descriptionCategory"> ${categories[index].description}</div>
  
  <div class = "button-category">
  <button id = "deleteCategory" data-id ="${categoryId}"  onclick = "deleteCategory(${categoryId})">deletCategory</button>
  <button id = "updateCategory" data-id="${categoryId}" onclick ="submitCategory(this)"> updateCategory </button >
  </div>
  `;
  
  div.innerHTML = table;
  div.classList.add("tableCate");
  return div;
}


function editUpdateCategory(index){
  name_category.value =  categories[index].name;
  des_category.value = categories[index].description;
 }
 
 
 
async function deleteCategory(categoryId) {
if (!confirm("Are you sure you want to delete this category?")) {
  return; // Exit if user cancels
}
  let type = "delete";
  let id = categoryId;
  let deletData = {
    type,
    id,
  };
  
  try {
let response = await api.deleteItem(deletData, "../management_files/crud_category.php");
 const data = await response.json();
 if(data.type == "delete"){
   alert("تم حذف المنتج");
 }
 
  dataPro.forEach((product, index) => {
      if (product.category_id == categoryId) {
        dataPro.splice(index, 1);
      }
    });
    
   const index = findIndexById(categories,categoryId);
    categories.splice(index, 1);
    
  let removeElement = productsContainer.querySelector('.tabcontent');
  
  productsContainer.removeChild(removeElement);
  
 tablink();
 createCategoryOptions();
 
} catch(error) {
}
}


function updateCateoryHtml(newCategory) {
  let name = document.querySelector("#nameCategory");
  name.textContent = newCategory.name;
  let description = document.querySelector("#descriptionCategory");
  description.textContent = newCategory.description;
}


async function updateCategory(newCategory,id) {
  newCategory.id = id;
  
  let index = findIndexById(categories,id);
  
  categories[index] = newCategory;
  tablink();
  updateCateoryHtml(newCategory);
  
  newCategory.type ="update"; 
  tempId = "";
  hideElement(addCategoryPageIdHTMl);
  
  clearCategory();
  create_category.textContent = "create";
 
  let response = await api.updateItem(newCategory,"management_files/crud_product.php");
  
  let data = await response.json();
  
  if (data.true) {
    alert(data.true);
  }
 
}

*/


