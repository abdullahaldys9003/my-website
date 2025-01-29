export default function dC(categories) {
  let categoryCard = document.createElement("div");
  
  categoryCard.classList.add("categoryCard");
  
  categories.forEach((category, i) => {
    const dataURI = `data:image/jpg;base64,${category.img}`;
    categoryCard.innerHTML += `
    <div class="card">
      <div class="contain">
        <center>
          <div class="image-container">
            <img src="${dataURI}" class="image">
          </div>
        </center>
       <p class="title">${category.name}</p>
       <p class="title">${category.description}</p>
        <div class="buttons">
          <button class = "product-button d" data-element-id="${category.id}">display</button>
        </div>
      </div>
    </div>
    `;
  });
  
   let cate = document.getElementById("displayCategoryUser");
    cate.style.display = "block ";
    cate.appendChild(categoryCard);
}





