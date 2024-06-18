const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // console.log('In another middlewaqre!');
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product',{         
        pageTitle: 'Add-product', 
        path:'/admin/add-product',  
        editing:false,      
    });
};

exports.postAddProduct = (req, res, next) => {
    //console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    
    
    //sequelize 스타일
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });
    
    //일반 쿼리 스타일
    // const product = new Product(null, title, imageUrl, description, price);
    
    // product.save().then(()=>{
    //     res.redirect('/');
    // }).catch(err => console.log(err));
    
};

exports.getEditProduct = (req, res, next) => {
    //?edit=true, url 파라미터
    const editMode = req.query.edit;
    if(!editMode)
    {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product=>{
        if ( !product ){
            return res.redirect('/');
        }
        console.log(product);
        res.render('admin/edit-product',{         
            pageTitle: 'Edit-product', 
            path:'/admin/edit-product',   
            editing: editMode,     
            product:product
        });
    });
    
};

exports.postEditProduct = (req, res, next) => {
    //console.log(req.body);
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products=>{
        res.render('admin/products',{ 
            prods: products,
            pageTitle: 'Admin Products',
            path:'/admin/products',                       
        });  
    }); 
};

exports.postDeleteProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};