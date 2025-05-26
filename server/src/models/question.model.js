import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    images: [{ type: String }],
    answer: {
        type: String,
    },
}, { timestamps: true });

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    images: [{ type: String }],
    software: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Software"
    }, answers: [answerSchema]
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

export default Question;