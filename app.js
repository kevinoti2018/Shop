// const amount=[]
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
          <button onClick='new Product().addToCart(${this.product.id})'>Add to Cart</button>
          <button onClick='new Product().updateProduct(${this.product.id})' >update</button>
            <button onClick='new Product().deleteProduct(${this.product.id})'><ion-icon name="trash-outline"></ion-icon></button>
          </div>
     </div>
        `
        return html
    }
    async addToCart(id){
       
        const response = await fetch(`http://localhost:3000/products/${id}`)
        const product =await response.json()
        console.log(product)
        
        const cartItems1 =  await fetch("http://localhost:3000/cart")
        const cartData1 = await cartItems1.json()
        console.log(cartData1)
         // Check if the product already exists in the cart
            const existingItem = cartData1.find(item => item.id === product.id)
            if (existingItem) {
                // If the item already exists, you can update the quantity or display an error message
                alert("Item already exists in cart!")
                return
            }
        const cartItems =  await fetch("http://localhost:3000/cart",{method:'POST', body:JSON.stringify(product), 
        headers:{"Content-Type":"application/json"}
    })
        const cartData = await cartItems.json()
        console.log(cartData)

       
      

    }
    async getCartData(){
        const cartItems1 =  await fetch("http://localhost:3000/cart")
        const cartData1 = await cartItems1.json()
        console.log(cartData1)   
        const totalPrice = cartData1.reduce((acc, item) => acc + parseInt(item.productPrice), 0); 
        console.log(totalPrice)  
        const totalPriceElem = document.querySelector(".total_price");
        totalPriceElem.innerHTML = `Total Price: $${totalPrice}`;
        const cartDetails = document.querySelector('.cart_display')
        cartDetails.innerHTML= cartData1.map(data=>{
            return `<div class="cart-class">
                  
                    <img src='${data.productImg}' alt=${data.productName}/>
                    <p>${data.productPrice}</p>
                    
                    <button class='delete' onClick='new Product().deleteCartProduct(${data.id})'><ion-icon name="trash-outline"></ion-icon></button></button>
                    </div>
                    
            `
        }).join("")
    //         let amountInputs = document.querySelectorAll('.amount_input')
    //     console.log(amountInputs)
    //     amountInputs.forEach((input) => {
    //         console.log(input)
    //         input.addEventListener('change', (e) => {
    //             console.log(e.target.value)
    //         })
    // })
    }
    
    async deleteCartProduct(id){
        await fetch(`http://localhost:3000/cart/${id}`,{method:'DELETE', 
        headers:{"Content-Type":"application/json"}
    })
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
        
        const btn = document.querySelector("#btn")
        btn.addEventListener('click', (e)=>{
         e.preventDefault()
         
         const updatedProduct= new Product().readValues();
         if(btn.innerText==="Update Product"){
             console.log("Updating");
             this.sendUpdate({...updatedProduct, id})
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
const cartIcon = document.querySelector('.cart')
cartIcon.addEventListener('click', new Product().getCartData)


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
        console.log(err)
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

