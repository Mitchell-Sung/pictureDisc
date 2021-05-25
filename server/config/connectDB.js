import mongoose from 'mongoose';
import config from './index';

const connectDB = async () => {
	try {
		mongoose.connect(config.MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});
		console.info(`MongoDB server started on port ${config.PORT}`);
	} catch (err) {
		console.error('Unable to connect to MongoDB!');
	}
};

export default connectDB;