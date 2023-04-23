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
          <h 2>${this.product.productName}</h>
          <h3> ${this.product.productDescription}</h3>
          <p>\$ ${this.product.productPrice}</p>
          <button>Add to Cart</button>
          <button onClick='new Product().updateProduct(${this.product.id})' >update</button>
            <button onClick='new Product().deleteProduct(${this.product.id})'><ion-icon name="trash-outline"></ion-icon></button>
          </div>
     </div>
        `
        return html
    }
    async deleteProduct(id){
        await fetch(`http://localhost:3000/products/${id}`,{method:'DELETE', 
        headers:{"Content-Type":"application/json"}
    })
    }
    async updateProduct(id){
        const response = await fetch(`http://localhost:3000/products/${id}`)
        const product =await response.json()
        // pre-populate
        this.prePopulate(product)
        
        btn.addEventListener('click',(e)=>{
            e.preventDefault()
            let updatedProduct = new Product().readValues()
            console.log(updatedProduct);
            if(btn.innerText=='Update Product'){
                console.log('loading...');
                 this.sendUpdate({...updatedProdut},id)
            }
        })
    }
    async sendUpdate(product){
       
        await fetch(`http://localhost:3000/products${product.id}`,{method:'PUT', body:JSON.stringify(product), 
        headers:{"Content-Type":"application/json"}
    })
    }
    prePopulate(product){
        document.querySelector('#p_name').value = product.productName
        document.querySelector('#p_image').value = product.productImg
        document.querySelector('#p_price').value = product.productPrice
        document.querySelector('#p_description').value=product.productDescription
        document.querySelector('#btn').innerText = 'Update Product'
    }
    readValues(){
        const productName = document.querySelector('#p_name').value
        const productImg = document.querySelector('#p_image').value
        const productPrice = document.querySelector('#p_price').value
        const productDescription = document.querySelector('#p_description').value
        return {productName,productPrice,productDescription,productImg}
    }
   async addProduct(){
        
        const newProdut = new Product().readValues()
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
    // console.log(products)
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
        const products =await response.json()
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
        // console.log(htmlProducts)
        let app = document.querySelector('#app')
        app.innerHTML = htmlProducts
    }
}

App.Init()




