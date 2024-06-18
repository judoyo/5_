const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(require.main.filename),
        'data',
        'cart.json'
    );
module.exports = class Cart{
    static addProduct(id, productPrice){
        // 기존 카트에서 정보를 가져온다
        fs.readFile(p, (err, fileContent)=>{
            let cart = {products: [], totalPrice: 0 };
            if(!err){
                cart = JSON.parse(fileContent);
            }
        
            // 해당 제품이 이미 존재하는 확인
            // 새로운 제품을 추가하거나, 기존 제품의 수량을 증가 시킨다
            //const existingProduct = cart.products.find(prod => prod.id === id);
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updateProduct;
            if (existingProduct) {
                updateProduct = { ...existingProduct };
                updateProduct.qty = updateProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updateProduct;
            } else {
                updateProduct = { id: id, qty: 1};
                //기존 cart의 products 를 불러오고 updateaProduct 를 추가
                cart.products = [...cart.products, updateProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err=>{
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return;
            }
            
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product)
            {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart),err=>{
                console.log(err);
            });
        });
    }

    static getCart(cb){
        fs.readFile(p, (err, fileContent)=>{
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(cart);
            }
        });
    }
}