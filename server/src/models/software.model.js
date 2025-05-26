import mongoose from 'mongoose';

const softwareSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
},
    { timestamps: true }
);

const Software = mongoose.model('Software', softwareSchema);
export default Software;