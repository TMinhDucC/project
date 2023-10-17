import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RatingDocument = Document & Rating;

@Schema({ timestamps: true })
export class Rating {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
    room: mongoose.Types.ObjectId;


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    users: mongoose.Types.ObjectId

    @Prop()
    rating: number;

    @Prop()
    comment: string;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Types.ObjectId;
        email: string;
    };

    @Prop()
    createAt: string;

    @Prop()
    isDelete: boolean;

    @Prop()
    deleteAt: string;

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Types.ObjectId;
        email: string;
    };

    @Prop()
    updateAt: string;

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Types.ObjectId;
        email: string;
    };
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
