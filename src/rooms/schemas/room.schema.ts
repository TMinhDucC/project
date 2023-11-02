import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type RoomDocument = HydratedDocument<Room>

@Schema({ timestamps: true })
export class Room {
  @Prop()
  name: string

  @Prop()
  description: string

  @Prop()
  price: number

  @Prop()
  address: string

  @Prop()
  images: [string]

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId
    email: string
  }

  @Prop()
  createAt: string

  @Prop()
  isDelete: boolean

  @Prop()
  deleteAt: string

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId
    email: string
  }

  @Prop()
  updateAt: string

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId
    email: string
  }
}

export const RoomSchema = SchemaFactory.createForClass(Room)
