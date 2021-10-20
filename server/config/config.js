import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

export default { MONGODB_URI, PORT, NODE_ENV };
