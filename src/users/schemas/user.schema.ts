
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import  mongooseDelete from 'mongoose-delete'

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId})
    role: mongoose.Schema.Types.ObjectId;

    @Prop()
    password: string;

    @Prop()
    refreshToken: string;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };

    @Prop()
    createAt: string;

    @Prop()
    isDelete: boolean;

    @Prop()
    deleteAt: string;



    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };

    @Prop()
    updateAt: string;


    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };

}

export class Register {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    role: mongoose.Schema.Types.ObjectId;

    @Prop()
    password: string;

    @Prop({ type: mongoose.Schema.Types.Array, ref: () => "Task" })
    tasks: string[];


    @Prop()
    refreshToken: string;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };

    @Prop()
    createAt: string;

    @Prop()
    isDelete: boolean;

    @Prop()
    deleteAt: string;

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };



    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };

}

export const UserSchema = SchemaFactory.createForClass(User).plugin(mongooseDelete);