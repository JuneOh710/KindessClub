import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    accountType: {
        type: String,
        enum: ['general', 'organization'],
        default: 'general'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    savedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    pastEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

const User = mongoose.model('User', userSchema);
export default User;
