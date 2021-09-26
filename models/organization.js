import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

// todo: get rid of user schema and just make everything an organization with userTypes: organization, user, admin
const organizationSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
    },
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