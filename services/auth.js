// services/authService.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/auth');
const authRoutes = require('../routes/auth'); // Adjust path as needed



const generateJWT = (user) => {
    const payload = {
        userId: user._id,
        email: user.email,
    };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
};

const registerWithEmail = async (email, password, firstName, lastName) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const newUser = new User({ email, password, firstName, lastName, provider: 'local' });
    await newUser.save();
    return generateJWT(newUser);
};

const loginWithEmail = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid email or password');

    return generateJWT(user);
};

const registerWithSSO = async (profile, provider) => {
    const { email, firstName, lastName, id } = profile;
    let user = await User.findOne({ email });
    if (!user) {
        user = new User({
            email,
            firstName,
            lastName,
            provider,
            [`${provider}Id`]: id
        });
        await user.save();
    }
    return generateJWT(user);
};

module.exports = { registerWithEmail, loginWithEmail, registerWithSSO };
