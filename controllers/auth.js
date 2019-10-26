const User = require('../models/User');

module.exports.login = function (req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    });
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
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            // Error handling
        }
    }

}

