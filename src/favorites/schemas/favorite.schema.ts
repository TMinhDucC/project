import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type FavoriteDocument = Document & Favorite;

@Schema({ timestamps: true })
export class Favorite {
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }])
    room: mongoose.Types.ObjectId[];


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: mongoose.Types.ObjectId


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

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
