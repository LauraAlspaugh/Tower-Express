import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
    name: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 900 },
    coverImg: { type: String, required: true, maxLength: 300 },
    location: { type: String, required: true, maxLength: 100 },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }

},
    { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

TowerEventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    count: true,
    ref: 'Ticket'
})
