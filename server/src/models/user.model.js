import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    resetToken: {
        type: String,
        default: null,
    },
    resetExpires: {
        type: Date,
        default: null,
    },
    role: {
        type: String,
        enum: ['admin', 'user','teacher'],
        required: true,
        default: 'user',
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;