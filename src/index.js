const endPoint = "http://localhost:3000/shops"
// When the DOMContentLoads I want to make a...
document.addEventListener('DOMContentLoaded', () => {
  getShops()
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
        <h4>${shop.attributes.industry}</h4>
        <button data-id=${shop.id}>edit</button>
      </div>
      <br><br>`;
// I can then add that function to the shop container which will then be rendered in the browser
      document.querySelector('#shop-container').innerHTML += shopMarkup
    })
  })
}
