
import mongoose, { Schema, Document } from 'mongoose';

console.log(process.env.MONGODB_URL)

var databaseUrl: string = process.env.MONGODB_URL

mongoose.connect(databaseUrl, { useNewUrlParser: true });

export interface IStuffs extends Document {
  title: string;
  description: string;
}

const StuffSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const stuffs = mongoose.model<IStuffs>('stuffs', StuffSchema) 

export { stuffs }