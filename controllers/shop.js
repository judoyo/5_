const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list',{ 
            prods: rows,
            pageTitle: 'All Products',
            path:'/products',     
        });  
    })
    .catch(err=> console.log());
   
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    //console.log(prodId);
    Product.findById(prodId).then(([product]) => {        
        console.log(product);
        res.render('shop/product-detail',{
            product: product[0],
            pageTitle: 'product-detail',  
            path:'/products',  
        })        
    }).catch(err => console.log(err));
    //res.redirect('/');
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/index',{ 
            prods: rows,
            pageTitle: 'shop',
            path:'/',            
        });  
    })
    .catch(err=> console.log());
    
};

exports.getCart = (req, res, next) => {    
    Cart.getCart(cart =>{
        Product.fetchAll(products =>{
            const cartProducts = [];
            for( product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
                
            res.render('shop/cart',{             
                pageTitle: 'Your Cart',
                path:'/cart',
                products: cartProducts           
            });  
        });       
    })     
};


exports.postCart = (req, res, next) => {    
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findById(prodId, (product)=>{
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {    
    const prodId = req.body.productId;
    Product.findById(prodId, product =>{
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};


exports.getOrders = (req, res, next) => {    
    res.render('shop/orders',{             
        pageTitle: 'Your Orders',
        path:'/orders',           
    });    
};

exports.getChekout = (req, res, next) => {    
    res.render('shop/chekout',{             
        pageTitle: 'Chekout',
        path:'/chekout',           
    });    
};