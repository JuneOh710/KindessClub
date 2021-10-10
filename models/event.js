import mongoose from 'mongoose';

// min max date logic
const today = new Date();
let [year, month, day] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
const maxYear = year + 1;
if (month < 10) { month = '0' + month.toString() }
if (day < 10) { day = '0' + day.toString() }

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        reqruied: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        min: `${year}-${month}-${day}`,
        max: `${maxYear}-${month}-${day}`
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
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
    address: {
        type: String,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Event = mongoose.model('Event', eventSchema);
export default Event;