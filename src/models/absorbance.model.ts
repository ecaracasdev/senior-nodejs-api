import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface AbsorbanceInput {
  userId: UserDocument["_id"];
  filename: string;
  dayOfStudy: string;
  temperature: string;
  concentration: string;
  maxIntensity: number;
  maxWavelenght: number;
}

export interface AbsorbanceDocument extends AbsorbanceInput, mongoose.Document {
  userId: UserDocument["_id"];
  filename: string;
  dayOfStudy: string;
  temperature: string;
  concentration: string;
  maxIntensity: number;
  maxWavelenght: number;
  createdAt: Date;
  updatedAt: Date;
}

const absorbanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    filename: { type: String, required: true },
    dayOfStudy: { type: String, required: true },
    temperature: { type: String, required: true },
    concentration: { type: String, required: true },
    maxIntensity: { type: Number, required: true },
    maxWavelenght: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AbsorbanceModel = mongoose.model<AbsorbanceDocument>(
  "Absorbance",
  absorbanceSchema
);

export default AbsorbanceModel;
