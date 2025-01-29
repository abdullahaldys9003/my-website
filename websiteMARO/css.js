let  buttonMenuAdding =  document.getElementById("buttonMenuAdding");



buttonMenuAdding.addEventListener("click",() => {
  
  let displayMenue = document.getElementById("displayMenue");
  
 if(displayMenue.style.display == "none"){
   showElement(displayMenue);
   buttonMenuAdding.textContent = "x";
 }else {
   buttonMenuAdding.innerHTML = "&#9776;";
   hideElement(displayMenue);
 }
 
});


export function hideElement(element) {
  element.style.display = "none";
}


export function showElement(element) {
  element.style.display = "block";
}




export function noneAllPage(containers) {
  containers.forEach(container => container.style.display = "none");
}



export function open_Page_Button(openPageButtons,containers) {
  openPageButtons.forEach(button => {
    
    button.addEventListener("click", () => {
      // إخفاء جميع العناصر
       noneAllPage(containers);
       const containerId = button.dataset.elementId
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




export function openNav() {
  document.getElementById("myNav").style.transform = "translateX(0)";

}


export function closeNav() {
  document.getElementById("myNav").style.transform = 'translateX(-100%)';

}


opennav.addEventListener("click",() => {
  openNav();
});


export function showElementFullScreen(element) {
  showElement(element);
  element.style.position = "fixed";
  element.style.zIndex = "1000";
 element.style.top ='0';
  element.style.button ="0";
 element.style.left ="0";
  element.style.right ="0";
 element.style.width = "100vw";
// element.style.height = "100vh";
 
}

export function showForm(element) {
  showElementFullScreen(element);
}





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