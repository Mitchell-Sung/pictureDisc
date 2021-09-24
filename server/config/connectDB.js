// @flow
import mongoose from 'mongoose';
import config from './config.js';

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
	mongoose.set('useFindAndModify', false);
};

export default connectDB;
