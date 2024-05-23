const path = require('path');

const express = require('express');

const app = express();

app.set('view engine','ejs');
app.set('views','views');
//app.set('views', path.join(__dirname, 'views')); // Template가 있는 디렉토리

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRoutes);
app.use('/admin', adminData.routes);

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404',{ pageTitle: 'Page Not Found123'});
});

app.listen(3000);
