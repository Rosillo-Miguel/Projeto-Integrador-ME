import type { IPaginatedResult } from "../../types/response.types.js";
import SpecialtyModel from "./specialty.model.js";
import type {
	ICreateSpecialtyDTO,
	ISpecialty,
	ISpecialtyRepository,
	IUpdateSpecialtyDTO,
} from "./specialty.types.js";
export class SpecialtyRepository implements ISpecialtyRepository {
	public async create(data: ICreateSpecialtyDTO): Promise<ISpecialty> {
		const specialty = await SpecialtyModel.create(data);
		return specialty.toObject();
	}

	public async findAll(
		page: number = 1,
		limit: number = 10,
		search?: string,
	): Promise<IPaginatedResult<ISpecialty>> {
		const filter = search ? { name: { $regex: search, $options: "i" } } : {};
		const skip = (page - 1) * limit;
		const [itens, totalItens] = await Promise.all([
			SpecialtyModel.find(filter)
				.skip(skip)
				.limit(limit)
				.sort({ createdAt: -1 })
				.lean(),

			SpecialtyModel.countDocuments(filter),
		]);
		const totalPages = Math.ceil(totalItens / limit);
		return {
			itens,
			totalItens,
			totalPages,
			currentPage: page,
		};
	}

	public async findById(id: string): Promise<ISpecialty | null> {
		return await SpecialtyModel.findById(id).lean();
	}

	public async update(
		id: string,
		data: IUpdateSpecialtyDTO,
	): Promise<ISpecialty | null> {
		return await SpecialtyModel.findByIdAndUpdate(id, data, {
			new: true,
		}).lean();
	}

	public async delete(id: string): Promise<ISpecialty | null> {
		return await SpecialtyModel.findByIdAndDelete(id).lean();
	}
}
