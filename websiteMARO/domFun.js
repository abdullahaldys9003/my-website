let  buttonMenuAdding =  document.getElementById("buttonMenuAdding");



let displayMenue = document.getElementById("displayMenue");



function chackFromIdHtml(element) {
  if (element === null) {
    alert("لم يتم العثور على العنصر ");
  }
}

export function toggleMenu(menuButton,menuElement) {
  
  menuButton.addEventListener("click",function() {
 let menuState = menuElement.style.display;
 
 if (menuState === "none") {
   showElement(menuElement);
   menuButton.textContent = "x";
   menuState = "block";
 } else {
   hideElement(menuElement);
   menuButton.innerHTML = "☰";
   menuState = "none";
 }
 });
 
}

export function hideElement(element) {
  element.style.display = "none";
}

export function showElement(element) { 
  element.style.display = "block";
}



export function noneAllPage(container) {
  const containers = document.querySelectorAll(`.${container}`);

  containers.forEach(container => container.style.display = "none");
}


export function open_Page_Button(openPageButtons,containers) {
  openPageButtons.forEach(button => {
    button.addEventListener("click", () => {
       noneAllPage(containers);
        const containerId = button.dataset.elementId;
         showElementPage(containerId);
    });
  });

}



export function showElementPage(element) {
  document.getElementById(element).style.display ="block";
}


document.addEventListener('click', function(event) {
  if (event.target.id !== 'openNav' && event.target.id !== 'myNav') {
    closeNav();
  }
});



const opennav = document.getElementById("openNav");


export function openNav(container) {
  container.style.transform = "translateX(0)";
}

export function closeNav() {
  
  document.getElementById("myNav").style.transform = 'translateX(-100%)';
  
  
}


function openTranslate(button,container) {
 button.addEventListener("click", () => {
  openNav(container);
});
}

export function showElementFullScreen(element) {
  showElement(element);
  element.style.position = "fixed";
  element.style.zIndex = "89";
  element.style.width = "100vw";
  element.style.height = "100vh";
  
}



export function showForm(element) {
  showElementFullScreen(element);
}


export function htmlId(element) {
  return document.getElementById(element);
}

export function findCategory(array, id) {
  return array.filter((item,index) => item.category_id == id);
}






const domFun = {
  hideElement:hideElement,
  showElement:showElement,
  noneAllPage:noneAllPage,
  open_Page_Button:open_Page_Button,
  showElementPage:showElementPage,
  openNav:openNav,
  closeNav:closeNav,
  openTranslate:openTranslate,
  showElementFullScreen:showElementFullScreen,
  showForm:showForm,
  toggleMenu:toggleMenu,
  htmlId:htmlId,
  findCategory:findCategory
};


/*
export function close_Form_Category() {
  
  let closeFormCategory = document.getElementById("closeFormCategory");
  
}
*/

openTranslate(opennav,document.getElementById("myNav"));



toggleMenu(buttonMenuAdding,displayMenue);


chackFromIdHtml(buttonMenuAdding);
chackFromIdHtml(displayMenue);


export default domFun;

/*










closeButton_product.addEventListener("click", function() {
  event.preventDefault();
  hideElement(addProductPageIdHTML);
  mood ="create";
});




menuButton.addEventListener("click", () => {
  let tab = document.getElementById("tab");
  if (tab.style.display == "none") {
   showElement(tab);
  }else{
    hideElement(tab);
  }
});






buttonAddCategory.addEventListener("click", () => {
  showForm(addCategoryPageIdHTMl);
  let tabx = document.getElementById("tab");
  hideElement(tabx);
  moodCategory ="create";
});



buttonAddProduct.addEventListener("click", function(){
  event.preventDefault();
  showForm(addProductPageIdHTML);
  mood ="create";
});





closeButton.addEventListener("click", function() {
  event.preventDefault();
  create_category.textContent ="create";
  hideElement(addCategoryPageIdHTMl);
  
});


}
*/
/*

submit.addEventListener("click", function(event) {
  event.preventDefault();
  if (mood == "update") {
    
    createProduct("update");
  } else if (mood == "create") {
    createProduct("create");
  }
});


*/


