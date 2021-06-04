import express from 'express';
import cors from 'cors';
import config from './config/index';
import connectDB from './config/connectDB';
import postRoute from './routes/route.post';
import userRoute from './routes/route.users';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use('/posts', postRoute);
app.use('/user', userRoute);

connectDB();

app.listen(config.PORT, (err) => {
	if (err) {
		console.error(err);
	}
	console.info(`Server started on port ${config.PORT}`);
});
