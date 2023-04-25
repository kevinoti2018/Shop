class Product{
    constructor(product){
        this.product = product;
    }
    render(){
        let html = ``
        return html
    }
   
    
}

class ProductList{
    async render(){
        let products = this.fetchData()
        html = ''
        for(let product of products){
            let prouctHtml = new Product(product).render()
        }
        html += productHtml
    }
   async getData(){
        const response = await fetch('')
        const products = response.json()
        return products
    }
}





async getCartData(){
    const cartItems1 =  await fetch("http://localhost:3000/cart")
    const cartData1 = await cartItems1.json()
    console.log(cartData1)      
    const cartDetails = document.querySelector('.cart_display')
    cartDetails.innerHTML= cartData1.map(data=>{
        return `<div class="cart-class"
                <p>${data.productName}</p>
                <img src='${data.productImg}' alt=${data.productName}/>
                <p>${data.productPrice}</p>
                <div class='decinc'>
                    <input type='text' class='amount_input' value=1 />
                </div>
                <button class='delete' onClick='new Product().deleteCartProduct(${data.id})' >delete</button>
                </div>
                
        `
    }).join("")
    let amountInputs = document.querySelectorAll('.amount_input')
    console.log(amountInputs)
    amountInputs.forEach((input) => {
        console.log(input)
        input.addEventListener('change', (e) => {
            console.log(e.target.value)
        })
})
   

}