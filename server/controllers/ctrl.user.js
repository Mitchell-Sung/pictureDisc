import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/model.user.js';

const secret = 'test';

const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existUser = await User.findOne({ email });

		if (!existUser) {
			return res.status(404).json({ message: 'User does not exist.' });
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existUser.password
		);

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ email: existUser.email, id: existUser._id },
			secret,
			{ expiresIn: '2h' }
		);

		res.status(200).json({ result: existUser, token });
	} catch (error) {
		res.status(500).json({ message: 'Sign in went wrong.' });
	}
};

const signup = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName } = req.body;

	try {
		const existUser = await User.findOne({ email });

		if (existUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "password doesn't match." });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id },
			secret,
			{ expiresIn: '2h' }
		);

		res.status(201).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: 'Sign up went wrong' });
	}
};

export { signin, signup };
