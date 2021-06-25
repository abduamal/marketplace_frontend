const shopEndPoint = "http://localhost:3000/shops"
// When the DOMContentLoads I want to make a...
document.addEventListener('DOMContentLoaded', () => {
  getShops()

  const createShopForm = document.querySelector("#create-shop-form")

  createShopForm.addEventListener("submit", (e)=> createShopHandler(e) )
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
  })
}

function createShopHandler(e){
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value
  const industryInput = document.querySelector('#input-industry').value
  postShop(nameInput, industryInput)
}
function postShop(name, industry){
  // confirm that values are coming in correctly
  console.log(name, industry)
  // body building
  const bodyData = {name, industry}
  fetch(shopEndPoint, {
    // using the post method because I am making a post request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(shop => {
    console.log(shop)
    const shopData = shop.data
    // render JSON response
    let newShop = new Shop(shopData, shopData.attributes)
    document.querySelector('#shop-container').innerHTML += newShop.renderShopCard()
  })
}
