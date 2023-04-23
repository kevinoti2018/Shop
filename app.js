class Product{
    //deal with a single product
    constructor(product){
        this.product=product
    }
    render(){
        // render a sinle product
        let html = `
    <div class="item">
        <img src=${this.product.productImg} alt="${this.product.productName}" >
        <div class="product-item__content">
          <h2>${this.product.productName}</h2>
          <h3> ${this.product.productDescription}</h3>
          <p>\$ ${this.product.productPrice}</p>
          <button>Add to Cart</button>
          <button>update</button>
        </div>
     </div>
        `
        return html
    }
   async addProduct(){
        const productName = document.querySelector('#p_name').value
        const productImg = document.querySelector('#p_image').value
        const productPrice = document.querySelector('#p_price').value
        const productDescription = document.querySelector('#p_description').value
        // console.log(productName,productPrice);
        const newProdut = {productName,productPrice,productDescription,productImg}
        await fetch('http://localhost:3000/products',{method:'POST', body:JSON.stringify(newProdut), 
        headers:{"Content-Type":"application/json"}
    })
    }
}
const btn = document.querySelector('#btn')
btn.addEventListener('click', new Product().addProduct)
class ProductList{
//deal with all products
async render(){
    // get list of products
    let products = await this.fetchProduct()
    console.log(products)
    let html=''
    for (let product of products){
        //console.log(product);
        const productHTML = new Product(product).render()
       
        html+= productHTML
    }
    return html
}
async fetchProduct(){
    try{
        const response = await fetch('http://localhost:3000/products')
        const products = response.json()
        return products
    }
    catch(err){
        conole.log(err)
    }
}
}
// new ProductList().render()
class App{
    //start out application
  static  async Init(){
        let productList = new ProductList()
        let htmlProducts =await  productList.render()
        console.log(htmlProducts)
        let app = document.querySelector('#app')
        app.innerHTML = htmlProducts
    }
}

App.Init()




