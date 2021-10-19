import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import connectDB from './config/connectDB.js';
import postRoute from './routes/route.post.js';
import userRoute from './routes/route.users.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({ origin: true, credentials: true }));

// CORS [test solving cors error]
app.use(function (req, res, next) {
	res.header(
		'Access-Control-Allow-Origin',
		'https://mit-picture-disc.netlify.app'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// CORS [check ruuning server side]
app.get('/', (req, res) => {
	res.send('Running...');
});

app.use('/posts', postRoute);
app.use('/user', userRoute);

connectDB();

app.listen(config.PORT, (err) => {
	if (err) {
		console.error('Server Running Error : ', err);
	}
	console.info(`Server started on port ${config.PORT}`);
});
