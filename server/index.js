const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const authRouter = require('./router/authRouter');
const productRouter = require('./router/productRouter');
const orderRouter = require('./router/orderRouter');
const basketRouter = require('./router/basketRouter');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/', basketRouter);
app.use('/', orderRouter);
app.use(cors());

const start = async () => {
	try {
		await mongoose
			.connect(`mongodb+srv://bykorotkov:15lsd7895@cluster0.y8sc2o3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
			.then(() => {
				console.log('database connected');
			});
		app.listen(PORT, () => console.log(`server started on port ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

start();
