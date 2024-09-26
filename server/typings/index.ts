import { Document } from "mongoose";

export interface IMsgs extends Document {
  author: string;
  msg: string;
  msgDatenTime: Date;
}

export interface JoinArr {
  nickName: string;
  joinedDatenTime: Date;
}
[];

export interface IJoinList {
  id: string;
  nickName: string;
  joinedDatenTime: Date;
}
