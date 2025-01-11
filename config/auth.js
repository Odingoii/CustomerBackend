// config.js
module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'yourSecretKey',
    jwtExpiration: '1h',  // JWT expiration set to 1 hour
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    facebookClientID: process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    appleClientID: process.env.APPLE_CLIENT_ID,
    appleClientSecret: process.env.APPLE_CLIENT_SECRET,
};
