import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
        default: "user"
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
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
    // location: {
    //     type: {
    //         type: String, // Don't do `{ location: { type: String } }`
    //         enum: ['Point'], // 'location.type' must be 'Point'

    //     },
    //     coordinates: {
    //         type: [Number],

    //     }
    // },
    // savedEvents: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Event'
    // }],
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});
// add password and username field (I will use email as their username)
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
export default User;
