const path = require('path');

const express = require('express');

const sequelize = require('./util/database');

const app = express();

app.set('view engine','ejs');
app.set('views','views');
//app.set('views', path.join(__dirname, 'views')); // Template가 있는 디렉토리

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0], result[1])
//     })
//     .catch(err => {
//         console.log(err)
//     });

const errorController = require('./controllers/error');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync().then(result => {
    //console.log(result);
    app.listen(3000);
}).catch(err => {
    console.log(err);
});

