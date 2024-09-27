import { Model, Schema, model } from 'mongoose';
import { IJoinList } from '../src/typings';

const JobínListSchema: Schema = new Schema(
  { id: String, nickName: String, joinedDatenTime: Date },
  { collection: 'OnlineList' }
);

export const JoinListModel: Model<IJoinList> = model<IJoinList>(
  'OnlineList',
  JobínListSchema,
  'OnlineList'
);
