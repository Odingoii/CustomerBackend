// controllers/authController.js
const authService = require('../services/auth');

const registerWithEmail = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const token = await authService.registerWithEmail(email, password, firstName, lastName);
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.loginWithEmail(email, password);
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const registerWithGoogle = async (req, res) => {
    try {
        const { profile } = req.body;  // Assuming profile is passed by Google OAuth
        const token = await authService.registerWithSSO(profile, 'google');
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const registerWithFacebook = async (req, res) => {
    try {
        const { profile } = req.body;  // Assuming profile is passed by Facebook OAuth
        const token = await authService.registerWithSSO(profile, 'facebook');
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const registerWithApple = async (req, res) => {
    try {
        const { profile } = req.body;  // Assuming profile is passed by Apple OAuth
        const token = await authService.registerWithSSO(profile, 'apple');
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    registerWithEmail,
    loginWithEmail,
    registerWithGoogle,
    registerWithFacebook,
    registerWithApple,
};
