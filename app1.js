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