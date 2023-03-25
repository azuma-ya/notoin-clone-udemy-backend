const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
	const password = req.body.password;

	try {
		//パスワードの暗号化
		req.body.password = CryptoJS.AES.encrypt(
			password,
			process.env.SECRET_KEY
		).toString();
		//ユーザーの新規登録
		const user = await User.create(req.body);
		//JWTの発行
		const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
			expiresIn: "24h",
		});
		res.status(200).json({ user, token });
	} catch (err) {
		res.status(500).json(err);
	}
};
