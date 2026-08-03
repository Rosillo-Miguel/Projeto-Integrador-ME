import mongoose, { Schema } from "mongoose";
import type { IPatient } from "./patient.types.js";

export const patientSchema = new Schema<IPatient>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: "A",
      enum: ["A", "I"],
    },
    sex: {
      type: String,
      required: true,
      trim: true,
      enum: ["F", "M"],
    },
    address: {
      cep: { type: String, trim: true },
      street: { type: String, trim: true },
      complement: { type: String, trim: true },
      number: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
    },
  },

  {
    timestamps: true,
  },
);

const Patient = mongoose.model<IPatient>("Patient", patientSchema);

export default Patient;
