import mongoose, { Schema } from "mongoose";

import type { ISpecialty } from "./specialty.types.js";

const SpecialtySchema = new Schema<ISpecialty>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

const Specialty = mongoose.model<ISpecialty>("Specialty", SpecialtySchema);

export default Specialty;
