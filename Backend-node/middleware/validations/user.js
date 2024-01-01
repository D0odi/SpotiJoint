const {check, validationResult} = require('express-validator');

exports.userValidation_signup = [
    check('name').trim().not().isEmpty().withMessage('Name is required and must be 3 characters minimum').isString().withMessage('Name must be valid'),
    check('nickname').trim().not().isEmpty().withMessage('Nickname is required and must be 3 characters minimum').isString().withMessage('Nickname must be valid'),
    check('email').trim().not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
    check('password').trim().not().isEmpty().withMessage('Password is required and must be 4 characters minimum'),
];

exports.userValidation_login = [
    check('email').trim().not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
    check('password').trim().not().isEmpty().withMessage('Password is required and must be 4 characters minimum'),
];

exports.userValidation_result = (req, res, next) => {
    const result = validationResult(req).array();
    if(result.length == 0) return next();

    const error = result[0].msg;
    res.json({success: false, message: error})
};
