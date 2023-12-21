import { Schema } from "mongoose";

export const FavoriteEventSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
    { toJSON: { virtuals: true } }
)

FavoriteEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

FavoriteEventSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
    ref: 'Event'
})