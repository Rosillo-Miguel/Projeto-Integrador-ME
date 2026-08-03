import type { IPaginatedResult } from "../../types/response.types.js";
import PatientModel from "./patient.model.js";
import type {
	ICreatePatientDTO,
	IPatient,
	IPatientRepository,
	IUpdatePatientDTO,
} from "./patient.types.js";
export class PatientRepository implements IPatientRepository {
	public async create(data: ICreatePatientDTO): Promise<IPatient> {
		const patient = await PatientModel.create(data);
		return patient.toObject();
	}

	public async findAll(
		page: number = 1,
		limit: number = 10,
		search?: string,
	): Promise<IPaginatedResult<IPatient>> {
		const filter = search
			? {
					$or: [
						{ name: { $regex: search, $options: "i" } },
						{ cpf: { $regex: search, $options: "i" } },
						{ email: { $regex: search, $options: "i" } },
						{ phone: { $regex: search, $options: "i" } },
					],
				}
			: {};
		const skip = (page - 1) * limit;

		const [itens, totalItens] = await Promise.all([
			PatientModel.find(filter)
				.skip(skip)
				.limit(limit)
				.sort({ createdAt: -1 })
				.lean(),

			PatientModel.countDocuments(filter),
		]);

		const totalPages = Math.ceil(totalItens / limit);
		return {
			itens,
			totalItens,
			totalPages,
			currentPage: page,
		};
	}

	public async findById(id: string): Promise<IPatient | null> {
		return await PatientModel.findById(id).lean();
	}

	public async update(
		id: string,
		data: IUpdatePatientDTO,
	): Promise<IPatient | null> {
		return await PatientModel.findByIdAndUpdate(id, data, { new: true }).lean();
	}

	public async delete(id: string): Promise<IPatient | null> {
		return await PatientModel.findByIdAndDelete(id).lean();
	}
}
