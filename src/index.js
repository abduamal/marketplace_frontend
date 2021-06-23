const endPoint = "http://localhost:3000/shops"
// When the DOMContentLoads I want to make a...
document.addEventListener('DOMContentLoaded', () => {
  getShops()

  const createShopForm = document.querySelector("#create-shop-form")

  createShopForm.addEventListener("submit", (e)=> createShopHandler(e) )
})

// ...get request translates our backend data into json
function getShops(){
  fetch(endPoint)
  .then(response => response.json())
  .then(shops => {
    // I then want to iterate over the json data...
    shops.data.forEach(shop => {
      // and then I want to display different attributes and save them to a function
      // how can I refactor this into a get request function?
      // rendering is important because w/o it, there is no meaningful output
      const shopMarkup = `
      <div data-id=${shop.id}>
        <h3>${shop.attributes.name}</h3>
        <h5>${shop.attributes.industry}</h5>
        <button data-id=${shop.id}>edit</button>
      </div>
      <br><br>`;
// I can then add that function to the shop container which will then be rendered in the browser
      document.querySelector('#shop-container').innerHTML += shopMarkup
    })
  })
}

function createShopHandler(e){
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value
  const industryInput = document.querySelector('#input-industry').value
  shopFetch(nameInput, industryInput)
}
function shopFetch(name, industry){
  // confirm that values are coming in correctly
  console.log(name, industry)
  // body building
  const bodyData = {name, industry}
  fetch(endPoint, {
    // using the post method because I am making a post request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(shop => {
    console.log(shop)
    const shopData = shop.data.attributes
    // render JSON response
    // refactor the following into a render function to DRY this up!
    const shopMarkup = `
    <div data-id=${shop.id}>
      <h3>${shopData.name}</h3>
      <h5>${shopData.industry}</h5>
      <button data-id=${shop.id}>edit</button>
    </div>
    <br><br>`;
    document.querySelector('#shop-container').innerHTML += shopMarkup
  })
}
