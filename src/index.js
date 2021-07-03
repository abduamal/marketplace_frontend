const shopEndPoint = "http://localhost:3000/shops"
const productEndPoint = "http://localhost:3000/products"
// When the DOMContentLoads I want to make a...
document.addEventListener('DOMContentLoaded', () => {
  // SHOPS
  getShops()
  // Listen for a submit event and handle the data
  // const createShopForm = document.querySelector("#create-shop-form")
  // createShopForm.addEventListener("submit", (e) => createShopHandler(e) )

  // PRODUCTS
  getProducts()
  // Listen for submit event and handle the data
  const createProductForm = document.querySelector("#create-product-form")
  createProductForm.addEventListener("submit", (e) => createProductHandler(e) )
})

// ...get request translates our backend data into json
function getShops(){
  fetch(shopEndPoint)
  .then(response => response.json())
  .then(shops => {
    // I then want to iterate over the json data...
    shops.data.forEach(shop => {
      // and then I want to display different attributes and save them to a function
      // how can I refactor this into a get request function?
      // rendering is important because w/o it, there is no meaningful output
      let newShop = new Shop(shop, shop.attributes)
      document.querySelector('#shop-container').innerHTML += newShop.renderShopCard()
    })
    showEditForms()
  })
}


function showEditForms(){
  editButtons = document.getElementsByClassName("edit-button")
  for (let i = 0; i < editButtons.length; i++){
    editButtons[i].addEventListener("click", e => {
      e.preventDefault()
      // editButtons[i].dataset.id...this works | or is it e.target.dataset.id?
      const id = parseInt(editButtons[i].dataset.id)
      const shop = Shop.findById(id)
      console.log(shop)
      document.querySelector('#update-shop').innerHTML = shop.renderShopUpdateForm()
      // Listen for the submit event of the edit form and handle the data
      document.querySelector('#update-shop').addEventListener("submit", e => updateShopFormHandler(e))
    })
  }
}

// function createShopHandler(e){
//   e.preventDefault()
//   const nameInput = document.querySelector('#input-name').value
//   const industryInput = document.querySelector('#input-industry').value
//   postShop(nameInput, industryInput)
// }

// function postShop(name, industry){
//   // confirm that values are coming in correctly
//   console.log(name, industry)
//   // body building
//   const bodyData = {name, industry}
//   fetch(shopEndPoint, {
//     // using the post method because I am making a post request
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(bodyData)
//   })
//   .then(response => response.json())
//   .then(shop => {
//     console.log(shop)
//     const shopData = shop.data
//     // render JSON response
//     let newShop = new Shop(shopData, shopData.attributes)
//     document.querySelector('#shop-container').innerHTML += newShop.renderShopCard()
//   })
// }

// Handle the data from the submit event
function updateShopFormHandler(e){
  e.preventDefault()
  const id = parseInt(e.target.dataset.id)
  const shop = Shop.findById(id)
  const name = e.target.querySelector('#input-name').value
  const industry = e.target.querySelector('#input-industry').value
  patchShop(shop, name, industry)
}

//Send the PATCH Request to the backend
function patchShop(shop, name, industry){
  const bodyJSON = {name, industry}
  fetch(`http://localhost:3000/shops/${shop.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(bodyJSON),
  })
  .then(response => response.json())
  .then(updatedShop => console.log(updatedShop))
}

function getProducts(){
  fetch(productEndPoint)
  .then(response => response.json())
  .then(products => {
    products.data.forEach(product => {
      // new instance of the Product class for every product in the array from the DB
      let newProduct = new Product(product, product.attributes)

      document.querySelector('#product-container').innerHTML += newProduct.renderProductCard()
    })
  })
}

function createProductHandler(e){
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value
  const shopInput = document.querySelector('#shops').value
  const shopId = parseInt(shopInput)
  const priceInput = document.querySelector('#input-price').value
  const quantityInput = document.querySelector('#input-quantity').value
  const descriptionInput = document.querySelector('#input-description').value
  postProduct(nameInput, priceInput, quantityInput, descriptionInput,shopId)
}

function postProduct(name, price, quantity, description, shop_id){
  // confirming that the values are coming through properly
  console.log(name, price, quantity, description, shop_id)
  // body building
  const bodyData = {name, price, quantity, description, shop_id}
  fetch(productEndPoint, {
    // using the post method because I am making a post request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(product => {
    console.log(product)
    const productData = product.data
    // render JSON response
    let newProduct = new Product(productData, productData.attributes)
    document.querySelector('#product-container').innerHTML += newProduct.renderProductCard()
  })
}

// function addToDDL(shop){
//   const list = document.getElementById("shop-name")
//   const addedShop = document.createElement("addedShop")
//   addedShop.text = shop
//   list.add(addedShop)
// }
