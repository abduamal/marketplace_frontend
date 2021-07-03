class Product {
  constructor(product, productAttributes) {
    this.id = product.id
    this.shop = product.attributes.shop
    this.name = product.attributes.name
    this.quantity = product.attributes.quantity
    this.price = product.attributes.price
    this.description = product.attributes.description
    Product.all.push(this)
    console.log(this);
  }

  renderProductCard(){
    return `
      <div data-id=${this.id}>
        <h3>${this.name}</h3>
        <h5>${this.shop.name}</h5>
        <p>Price: $ ${this.price}</p>
        <p>Quantity: ${this.quantity}</p>
        <p>${this.description}</p>
        <button data-id=${this.id}>edit</button>
      </div>
      <br><br>`;
  }
}

Product.all = []
