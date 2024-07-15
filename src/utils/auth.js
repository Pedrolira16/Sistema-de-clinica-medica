import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import config from '../config/config';

export const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10);
}

class AuthUtils {
	static decodeData(token, key = config.secretKey) {
		try {
			return verify(token, key);
		} catch (err) {
			return null;
		}
	}

	static getBearerToken(req) {
		const authorization = req.headers.authorization || "";
		const [, token] = authorization.split(" ");

		return token;
	}

	static generateToken(
		payload,
		{ secret = config.secretKey, expiresIn = 86400 } = {}
	) {
		return sign(payload, secret, { expiresIn });
	}

	static getBasicToken(apiKey, secretKey) {
		return Buffer.from(`${apiKey}:${secretKey}`).toString("base64");
	}

	static isPasswordValid(password, hash) {
		return bcrypt.compareSync(password, hash);
	}
}

export default AuthUtils;