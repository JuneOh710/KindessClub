import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const organizationSchema = new mongoose.Schema({
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
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
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

// add password and username field (name)
organizationSchema.plugin(passportLocalMongoose);

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;