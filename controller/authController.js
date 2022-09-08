const User = require('../model/userSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validations/AuthValidation');
const { json } = require('body-parser');

const register = async (req, res, next) => {
    const {username , email , password} = req.body;
    console.log(req.body)
    let emailRegistered = await User.findOne({ email });
    if (emailRegistered) {
        return res.status(400).send('User Exists.');
    }
    const encPassword = bcryptjs.hashSync(password , 15);
    try {
        const user = await User.create({ username, email, password : encPassword });
        res.status(201).json({ message: 'User Registered' ,user });
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

const login = async (req, res, next) => {

    const errors = loginValidation.validate(req.body, { abortEarly: false })
    if (errors.error) {
        const allErrors = errors.error.details.map(err => err.message);
        return next({ status: 400, message: allErrors });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next({
                status: 404, message: "This Email Doesn't Exist" });
        }
        const dbPass = user.password;
        const isSamePassword = await bcryptjs.compare(password , dbPass);
        if (isSamePassword) {
            const JsonPayLoad = { id : user._id , username : user.username, email : user.email };
            console.log(JsonPayLoad)
            const token = jwt.sign(JsonPayLoad, process.env.SECRET_KEY ,{ expiresIn : '3d'});
            res.json({ token ,  message : 'Logged In' ,id:user._id ,user});
        } else {
            next({ status: 404, message: 'Password is Incorrect' })
        }
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

module.exports = { register , login}