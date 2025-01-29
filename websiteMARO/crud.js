import domFun from './domFun.js';
import ProductManager from './product.js';

import CategoryManager from './category.js';


//انشاء دالة لجلب البيانات واضافتها الى الكلاسات

const productManager = new ProductManager();


const categoryManager = new CategoryManager();


//open page Product : 
//show Product Form
//add addEventListener :
//creact or update 

let addCategoryPageIdHTML = document.getElementById("add-Category-Page");
   
 let addProductPageIdHTML = document.getElementById("add-Product-Page");
   
   
let showProductsPageIdHTML = document.getElementById("show-Products-Page");

let onClickButtonCategory=null;


 document.getElementById("open-Category-Page").addEventListener("click", () => {
  domFun.noneAllPage("container");
  domFun.showElement(addCategoryPageIdHTML);
  
    onClickButtonCategory = document.getElementById("buttonCategory");
    
    onClickButtonCategory.textContent ="create";
    
   categoryManager.addCategory(onClickButtonCategory);
   
});



 document.getElementById("open-Product-Page").addEventListener("click", () => {
  domFun.noneAllPage("container");
  domFun.showElement(addProductPageIdHTML);
  const category = categoryManager.getDataCategory();
  
   productManager.addToProduct(category);
});

domFun.noneAllPage("container");




/*

import {prossesCategory} from './categories.js';
import {createProduct,getTotal,divForm,displayProducts,deleteProduct} from './products.js';
import {noneAllPage,showElement,hideElement,open_Page_Button,showForm,showElementFullScreen} from './css.js';
import {findCategory} from './module/fetch.js';


let moodCategory = null;
export let moodProduct = null;
let category = null;

let product= null;

if (product == null) {
  product= [];
}

if (category == null) {
  category =[];
}

const htmlId =(element) => document.getElementById(element);

//buttonPage
let addCategoryPageIdHTMl = document.getElementById("add-Category-Page");


let showProductsPageIdHTML = document.getElementById("show-Products-Page");


//زر عرض نموذج الصنف
let buttonAddCategory = document.getElementById("buttonAddCategory");


let addProductPageIdHTML = document.getElementById("add-Product-Page");


//onClick

//زر اضافة البيانات لصنف
let onClickButtonCategory= document.getElementById("buttonCategory");

let onClickButtonProduct = htmlId("onClickButtonProduct");

const containers = document.querySelectorAll(".container");


const openPageButtons = document.querySelectorAll(".openPageButton");


const productsContainer = document.getElementById("products-container");





 buttonAddCategory.addEventListener("click", () => {
  showForm(addCategoryPageIdHTMl);
  moodCategory ="create";
  onClickButtonCategory.textContent = "Create";
  //clearCategory();
});


 onClickButtonCategory.addEventListener("click", function() {
  event.preventDefault();
  prossesCategory(moodCategory);
});




"buttonAddProduct"

let buttonAddProduct = document.getElementById("buttonAddProduct");

 buttonAddProduct.addEventListener("click", () => {
   showForm(addProductPageIdHTML);
   moodProduct = "create";
   onClickButtonProduct.textContent ="Create";
   onClickButtonProduct.setAttribute("type","create");
 });
 




onClickButtonProduct.addEventListener("click",function(){ 
     event.preventDefault();
      const type =  onClickButtonProduct.getAttribute("type");
         createProduct(type);
});





function addTab() {
  let menutab= document.getElementById("menutab");
  let tab = document.getElementById("tab");
    menutab.addEventListener("click", () => {
      if (tab.style.display == "none") {
        showElement(tab);
      } else {
        hideElement(tab);
      }
    });
}




const closeFormCategory= htmlId("closeFormCategory");

closeFormCategory.addEventListener("click",function () {
  event.preventDefault();
  hideElement(addCategoryPageIdHTMl);
  
});



const closeFormProduct = htmlId("closeFormProduct");
closeFormProduct.addEventListener("click", function () {
  event.preventDefault();
  hideElement(addProductPageIdHTML);
});
*/

/*
const displayCategoryContainer = htmlId("displayCategoryContainer");

const displayProductsContainer = htmlId("displayProductsContainer");
*/

/*
import {fetchDatePhp,findCategory,findindex} from '../module/fetch.js';
*/

//import {showElement,hideElement,noneAllPage,open_Page_Button,showElementFullScreen,closeNav,openNav} from '../css.js';

/*
let categories = null;
let dataPro = null;
let categoryName = null;
let filteredProduct = null;




//temp
let tempId = "";
let mold = "create";
let tmp = ""; // متغير وهمي جلوبل
let moodCategory ="create";
//bew page





let showProductsPageIdHTML = document.getElementById("show-Products-Page");


let addProductPageIdHTML = document.getElementById("add-Product-Page");



//container 
const productsContainer = document.getElementById("products-container");





//ceateing button

let submit = document.getElementById("submit");


//add button
let buttonAddProduct = document.getElementById("buttonAddProduct");
 

//close form
const closeButton_product = document.getElementById("close_product");
const closeButton = document.getElementById("close_category");

//button form 
let product_category = document.getElementById("product_category");








function checkDataTypes() {
  if (isNaN(price.value)) {
    alert("سعر المنتج غير صحيح");
    return false;
  }

  if (typeof title.value !== "string") {
    alert("عنوان المنتج غير صحيح");
    return false;
  }

  return true;
}

function checkEmptyValues() {
  if (title.value === "") {
    alert("يجب إدخال عنوان المنتج");
    return false;
  }

  if (price.value === "") {
    alert("يجب إدخال سعر المنتج");
    return false;
  }
  return true;
}

function findIndexOfElementByName(array, elementName) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name == elementName) {
      return i;
    }
  }
  return -1; // لم يتم العثور على العنصر
}


function getSelectedCategoryId() {
  return document.getElementById("product_category").value;
}

function buttonUpdateProduct(productId) {
const index = findIndexById(dataPro,productId);
alert(productId);
 editUpdate(index);
 tmp = index;
 submit.innerHTML = "Update";
 mood = "update";
 showElementFullScreen(addProductPageIdHTML);
}



function submitCategory(itemUpdute) {
  let submitUpateCategory = document.getElementById("updateCategory");
  const id = itemUpdute.dataset.id;
  let index = findIndexById(categories,id);
  editUpdateCategory(index);
  create_category.textContent = "update";
  moodCategory ="update";
  showElementFullScreen(addCategoryPageIdHTMl);
   tempId = id;
} 


function chackTypes() {
if (typeof name_category.value !== 'string') {
  alert("اسم الفئة يجب أن يكون نصًا");
  return false;
}

if (!(imageCategory.files[0] instanceof File)) {
  alert("يجب اختيار صورة للفئة");
  return false;
}
}


async function server() {
  if (dataPro == null) {
  products =  await fetchDatePhp('../getData/get_products.php');
    globalProducts(products);
  }
  
  if (categories == null) {
  categories = await fetchDatePhp("../getData/get_category.php");
  createCategoryOptions(categories);
  tablink(categories);
  addEventLinck(showByCategoryName);
  createCategoryNavigationTabs();
  
  }
}


server();
*/


 //noneAllPage(containers);
 //showElement(containers[1]);
 
 //open_Page_Button(openPageButtons,containers);



