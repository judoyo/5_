const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // console.log('In another middlewaqre!');
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product',{         
        pageTitle: 'add-product', 
        path:'/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    //console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products)=>{
        res.render('shop/product-list',{ 
            prods: products,
            pageTitle: 'shop',
            path:'/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });    
};

//shop.js 와 admin.js로 분리