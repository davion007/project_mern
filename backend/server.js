const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user-routes');
const productRoutes = require('./routes/product-routes');
const cartRoutes = require('./routes/cart-routes');


mongoose.connect('mongodb://127.0.0.1:27017/ecom')
    .then(() => { console.log("DB CONNECTED") })
    .catch(err => { console.log(err) });

app.use(cors());
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})