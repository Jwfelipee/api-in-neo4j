import mongoose from 'mongoose';

const url = process.env.MONGO_URL || '';

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as any);

export { mongoose };
