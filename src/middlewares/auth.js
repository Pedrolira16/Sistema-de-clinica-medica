import jwt from 'jsonwebtoken';
import config from '../config/config';

class Authenticator {
	static verifyToken(req, res, next) {
		const token = req.headers['authorization'];

		if (!token) {
			return res.status(401).json({ auth: false, message: 'No token provided.' });
		}

		jwt.verify(token, config.secretKey, (err, decoded) => {
			if (err) {
				return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
			}
			
			req.userId = decoded.id;
			req.companyId = decoded.company_id;
			req.isAdm = decoded.is_adm;

			next();
		});
	}

	static getToken(req, res, next) {
		const token = req.headers['authorization'];

		jwt.verify(token, config.secretKey, (err, decoded) => {
			if (!err) {
				req.companyId = decoded?.company_id;
				req.userId = decoded?.id;
				req.isAdm = decoded?.is_adm;
			}

			next();
		});
	}

	static adminAuth(req, res, next) {
		if (!req.isAdm) {
			return res.status(403).json({ auth: false, message: 'Not authorized.' });
		}

		next();
	}
}
export default Authenticator;   