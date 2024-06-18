const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(path.dirname(require.main.filename),
        'data',
        'products.json'
    );
const getProductsFromFile = cb =>{
    
    fs.readFile(p, (err, fileContent)=>{
        if(err){
            cb([]);
        }else{
            //console.log(JSON.parse(fileContent));
            cb(JSON.parse(fileContent));
        }
        
    });
};
//const products = [];

module.exports = class Product {
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        
        getProductsFromFile(products=>{    
            if(this.id)
            {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err)=>{
                    console.log(err);
                });
            }else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err)=>{
                    console.log(err);
                });
            }
           
        });      
    }

    static deleteById(id)
    {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            //해당 아이디가 아닌 배열만 반환
            const updateProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updateProducts), err =>{
                if(!err){
                    Cart.deleteProduct(id, product.price)
                }
            });
        });
    }

    static fetchAll(cb)
    {
        getProductsFromFile(cb);
        //return products;
    }

    static findById(id, cb)
    {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}