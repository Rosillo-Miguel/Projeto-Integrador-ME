import type { IPaginatedResult } from "../../types/response.types.js";
import ExpertModel from "./expert.model.js";
import type {
	ICreateExpertDTO,
	IExpert,
	IExpertRepository,
	IFindAllExpertParams,
	IUpdateExpertDTO,
} from "./expert.types.js";

export class ExpertRepository implements IExpertRepository {
	public async create(data: ICreateExpertDTO): Promise<IExpert> {
		const expert = await ExpertModel.create(data);
		return expert.toObject();
	}

	public async findAll({
		page,
		limit,
		search,
		specialty,
	}: IFindAllExpertParams): Promise<IPaginatedResult<IExpert>> {
		let filter: any = {};

		if (search) {
			filter = search
				? {
						$or: [
							{ name: { $regex: search, $options: "i" } },
							{ cpf: { $regex: search, $options: "i" } },
							{ email: { $regex: search, $options: "i" } },
							{ phone: { $regex: search, $options: "i" } },
						],
					}
				: {};
		}

		if (specialty) {
			filter.specialty = specialty;
		}

		const skip = (page - 1) * limit;

		const [itens, totalItens] = await Promise.all([
			ExpertModel.find(filter)
				.populate("specialty")
				.skip(skip)
				.limit(limit)
				.sort({ createdAt: -1 })
				.lean(),

			ExpertModel.countDocuments(filter),
		]);

		const totalPages = Math.ceil(totalItens / limit);

		return {
			itens,
			totalItens,
			totalPages,
			currentPage: page,
		};
	}

	public async findById(id: string): Promise<IExpert | null> {
		return await ExpertModel.findById(id).lean();
	}

	public async update(
		id: string,
		data: IUpdateExpertDTO,
	): Promise<IExpert | null> {
		return await ExpertModel.findByIdAndUpdate(id, data, { new: true }).lean();
	}

	public async delete(id: string): Promise<IExpert | null> {
		return await ExpertModel.findByIdAndDelete(id).lean();
	}
}
