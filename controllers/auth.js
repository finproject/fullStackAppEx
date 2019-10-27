const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            //Generation of token, passwords contains
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});
            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: 'Password dont contains'
            });
        }
    } else {
        res.status(404).json({
            message: 'User with this email dont found'
        });
    }
};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        //The user exists, need to send an error
        res.status(409).json({
            message: 'This email is already exists'
        });
    } else {
        //Need to create a user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            // Error handling
        }
    }
}


