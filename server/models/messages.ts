import { Model, Schema, model } from "mongoose";
import { IMsgs } from "../typings";

const MsgSchema: Schema = new Schema(
  { author: String, msg: String, msgDatenTime: Date },
  { collection: "chat" }
);

export const MsgModel: Model<IMsgs> = model<IMsgs>("chat", MsgSchema, "chat");
