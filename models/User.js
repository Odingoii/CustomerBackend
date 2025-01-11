// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    provider: { type: String, enum: ['local', 'google', 'facebook', 'apple'], default: 'local' }, // local for email/password
    googleId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    appleId: { type: String, unique: true, sparse: true },
    dateJoined: { type: Date, default: Date.now }
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare password for login
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
