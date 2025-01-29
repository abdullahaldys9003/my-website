import domFun from './domFun.js';
import ProductManager from './product.js';

class CategoryManager {
  constructor() {
   this.category = [];
   this.tempId =null;
    //زر اضافة الصنف
    this.moodCategory= "create";
   this.showProductsPageIdHTML = document.getElementById("show-Products-Page");
   
  this.displayCategoryContainer = document.getElementById("displayCategoryContainer");

}

 getDataCategory = () => this.category;
  
  deleteCategory(id) {
    const categoryElement = document.getElementById("deleteCategory");

    if (categoryElement === null) {
      alert("خطاء في الحذف");
      return;
    }

    categoryElement.addEventListener("click", () => {
      const name = document.getElementById(`category_${id}`);
      name.remove();
      const exetableCate = document.querySelector(".tableCate");
      if (exetableCate) exetableCate.remove();
      this.category.splice(id, 1);
      ProductManager.deleteAll(id); // تأكد أن deleteAll موجودة في ProductManager
    });
  }
  
  categoryInputs() {
    return {
      nameInput: document.getElementById("categoryName"),
      descriptionInput: document.getElementById("categoryDescription"),
      imageInput: document.getElementById("imageCategory"),
    };
  }

  categoryInputValue() {
    const { nameInput, descriptionInput, imageInput } = this.categoryInputs();
    return {
      name: nameInput.value,
      description: descriptionInput.value,
      image: imageInput.files[0],
    };
  }

  check(categoryData) {
    const { name, description } = categoryData;

    if (!name) {
      alert("يجب إدخال اسم الفئة");
      return false;
    }

    if (!isNaN(name)) {
      alert("يجب أن يكون اسم الفئة نصيًا");
      return false;
    }

    if (!description) {
      alert("يجب إدخال وصف الفئة");
      return false;
    }

    if (!isNaN(description)) {
      alert("يجب أن يكون وصف الصنف نصيًا");
      return false;
    }

    return true;
  }

  processCategory() {
    const categoryInputs = this.categoryInputValue();
    
    if (this.check(categoryInputs)) {
      if (this.moodCategory === "update") {
        this.updateCategory(categoryInputs, this.tempId);
      } else if (this.moodCategory === "create") {
        categoryInputs.type = "add";
        this.createCategory(categoryInputs);
         this.displayCategories();
      }
    }
  }
  
  displayCategories () {
    const tableCategories = document.querySelector(".tableCategory");
    if (tableCategories) {
      this.displayCategoryContainer.removeChild(tableCategories);
    }

    const table = document.createElement("table");
    table.id = "table";
    table.innerHTML = `
      <tr>
        <th>name</th>
        <th>discription</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
      ${this.category.map((product, index) => `
        <tr>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${index}</td>
          <td><button class="updateCategory" data-id="${index}">Update</button></td>
          <td><button class="deleteCategory" data-id="${index}">Delete</button></td>
        </tr>`).join('')}
    `;
    const container = document.createElement("div");
    container.classList.add("tableCategory");
    container.appendChild(table);
    this.displayCategoryContainer.appendChild(container);
      this.addEventListeners();
  }
  
  createCategory(newCategory) {
    const { name, description, type } = newCategory;
    
    const data = { name, description, type };
    
    if (this.category.find((item) => item.name === name)) {
      alert("الصنف موجود");
      return;
    }

    this.category.push(data);
  }
  
  clearCategory() {
    const { nameInput, descriptionInput, imageInput } = this.categoryInputs();
    nameInput.value = "";
    descriptionInput.value = "";
    imageInput.value = "";
  }

  updateCategoryName(id) {
    const productCategory = document.getElementById("selectedCategory");
    productCategory.value = id;
  }



  addEventListeners() {
   /* 
    document.querySelectorAll(". deleteCategory").forEach(button => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        alert(id);
       // this.category.splice(id, 1);
       // this.displayCategories();
      });
    });
*/

    document.querySelectorAll(".updateCategory").forEach(button => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        this.editCategory(id);
      });
    });
  }


  
  
  editCategory(id) {
   alert(id);

    const { nameInput, descriptionInput } = this.categoryInputs();
    
    nameInput.value = this.category[id].name;
    descriptionInput.value = this.category[id].description;
  }
  
  addCategory(onClickButtonCategory) {
  onClickButtonCategory.addEventListener("click", (event) => {
    event.preventDefault();
    this.processCategory();
    this.clearCategory();
  });
}

}

export default CategoryManager;