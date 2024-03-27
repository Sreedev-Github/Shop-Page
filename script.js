import { products } from "./data.js";

const accordion = document.querySelectorAll(".accordion");
const cardContainer = document.querySelector(".cards-container");
const productCat = document.querySelector(".product-category");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function (e) {
    // We use this. isntead of e.target.value as if we click on the icon it has no sibling so the e.target.value will return null and the accordion won't work,
    // So instead we are using this. to make sure it is targetting the acccordion itslef
    // So intead of the event this function is always called by the accordion itself this referes to the accordion which called it
    this.classList.toggle("active-accordion");
    const accordionData = this.nextElementSibling;
    if (accordionData.style.maxHeight) {
      accordionData.style.maxHeight = null;
    } else {
      accordionData.style.maxHeight = accordionData.scrollHeight + "px";
    }
  });
}

const displayProducts = function (data) {
  cardContainer.innerHTML = data
    .map((product) => {
      return `
        <div class="card">
        <div class="card-image">
              <img src="${product.product_image}" alt="Joker">
          </div>
          <div class="card-text">
              <p class="card-title">${product.product_name}</p>
              <p class="card-title">${product.price}</p>
          </div>
          <button class="addToCart">Add to Cart</button>
          </div>
        `;
    })
    .join("");
};

displayProducts(products);

// Categories

const setCategory = () => {
  const allCats = products.map((item) => item.category);
  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];

  productCat.innerHTML = categories
    .map((cat) => {
      return `
    <div class="options">
    <input type="checkbox" class="cat-input" name="${cat}" id="${cat}">
    <label for="${cat}">${cat}</label>
    <span class="category-value">99</span>
    </div>
    `;
    })
    .join("");

  //We can just call the event inside the parent container to avoid using for each loop for every category
  const allCatsInputs = document.querySelectorAll(".cat-input");
  let selectedCategories = [];
  
  allCatsInputs.forEach((input) => {
      input.addEventListener("click", function (e) {
          if (this.checked) {
                selectedCategories.push(this.name);
          } else {
              selectedCategories = selectedCategories.filter(cat => cat !== this.name);
          }
          filterProducts();
      });
  });
  const filterProducts = () => {
    if (selectedCategories.length === 0) {
        displayProducts(products);
    }else if (selectedCategories.includes("All")){
        displayProducts(products);
    }
     else {
        const filteredProducts = products.filter((item) => selectedCategories.includes(item.category));
        displayProducts(filteredProducts);
    }
};
};

setCategory();



// IIFE - to make sure the accordions are opened up when the page loads
(function () {
  accordion.forEach((acc) => {
    const accordionData = acc.nextElementSibling;
    if (!accordionData.style.maxHeight) {
      accordionData.style.maxHeight = accordionData.scrollHeight + "px";
    }
  });
})();

{
  /*
 categories.forEach((cat)=>{
    const productCat = document.querySelector('.product-category')
    const newCat = document.createElement('div')
    newCat.classList = 'options'
    newCat.innerHTML = `
        <input type="checkbox" name="${cat}" id="${cat}">
        <label for="${cat}">${cat}</label>
        <span class="category-value">99</span>
    `
    productCat.appendChild(newCat)
    console.log(cat);
   })

const displayProducts = function (data) {

    const newCard = document.createElement("div");
    newCard.classList = "card";
    newCard.innerHTML = `
          <div class="card-image">
              <img src="${products[i].product_image}" alt="Joker">
          </div>
          <div class="card-text">
              <p class="card-title">${products[i].product_name}</p>
              <p class="card-title">${products[i].price}</p>
          </div>
          <button class="addToCart">Add to Cart</button>
          `;

    cardContainer.appendChild(newCard);
};



*/
}
