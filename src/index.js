const endPoint = "http://localhost:3000/shops"

document.addEventListener('DOMContentLoaded', () => {
  getShops()
}) 

function getShops(){
  fetch(endPoint)
  .then(response => response.json())
  .then(shops => {
    console.log(shops)
  })
}