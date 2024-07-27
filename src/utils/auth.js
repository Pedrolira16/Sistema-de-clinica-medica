import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import config from '../config/config';


export const hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
}
export const validateCPF = (cpf) => {

	if (cpf.length !== 11) return false;
	if (/^(\d)\1{10}$/.test(cpf)) return false;

	let soma = 0;
	let resto;

	for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
	resto = (soma * 10) % 11;
	if ((resto === 10) || (resto === 11)) resto = 0;
	if (resto !== parseInt(cpf.substring(9, 10))) return false;

	soma = 0;

	for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
	resto = (soma * 10) % 11;
	if ((resto === 10) || (resto === 11)) resto = 0;
	if (resto !== parseInt(cpf.substring(10, 11))) return false;

	return true;
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