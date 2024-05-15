const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(express.urlencoded({ extended: false }));

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not found</h1>');
});

app.listen(3000);
a