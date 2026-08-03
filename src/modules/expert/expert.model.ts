import mongoose, { Schema } from "mongoose";
import type { IExpert } from "./expert.types.js";

export const expertSchema = new Schema<IExpert>(
	{
		name: { type: String, required: true, trim: true },
		cpf: { type: String, required: true, trim: true },
		dateOfBirth: { type: Date, required: true },
		sex: { type: String, required: true, trim: true },
		specialty: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Specialty",
		},
		professionalDocument: { type: String, required: true },
		phone: { type: String, required: false, trim: true },
		email: { type: String, required: false, trim: true },
		address: {
			cep: { type: String, trim: true },
			street: { type: String, trim: true },
			complement: { type: String, trim: true },
			number: { type: String, trim: true },
			city: { type: String, trim: true },
			state: { type: String, trim: true },
		},
	},
	{ timestamps: true },
);

const ExpertModel = mongoose.model<IExpert>("Expert", expertSchema);
export default ExpertModel;
