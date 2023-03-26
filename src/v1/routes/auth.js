const router = require("express").Router();
const User = require("../models/user");
const { body } = require("express-validator");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");
require("dotenv").config();

//ユーザー新規登録API
router.post(
	"/register",
	body("username")
		.isLength({ min: 8 })
		.withMessage("ユーザー名は8文字以上である必要があります。"),
	body("password")
		.isLength({ min: 8 })
		.withMessage("パスワードは8文字以上である必要があります。"),
	body("confirmPassword")
		.isLength({ min: 8 })
		.withMessage("確認用パスワードは8文字以上である必要があります。"),
	body("username").custom((value) => {
		return User.findOne({ username: value }).then((user) => {
			if (user) {
				return Promise.reject("このユーザーはすでに使われています。");
			}
		});
	}),
	validation.validate,
	userController.register
);

module.exports = router;

//ログイン用API
router.post(
	"/login",
	body
		.apply("username")
		.isLength({ min: 8 })
		.withMessage("ユーザー名は8文字以上である必要があります。"),
	body("password")
		.isLength({ min: 8 })
		.withMessage("パスワードは8文字以上である必要があります。"),
	validation.validate,
	userController.login
);

//JWT認証API
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
	return res.status(200).json({ user: req.user });
});
