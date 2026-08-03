import type {
	ICreateExpertDTO,
	IExpertRepository,
	IFindAllExpertParams,
	IUpdateExpertDTO,
} from "./expert.types.js";

export class ExpertService {
	constructor(private expertRepository: IExpertRepository) {}

	public async create(data: ICreateExpertDTO) {
		return await this.expertRepository.create(data);
	}

	public async findAll({
		page,
		limit,
		search,
		specialty,
	}: IFindAllExpertParams) {
		return await this.expertRepository.findAll({
			page,
			limit,
			search,
			specialty,
		});
	}

	public async findById(id: string) {
		const expert = await this.expertRepository.findById(id);
		if (!expert) throw new Error("Especialista não encontrado");
		return expert;
	}

	public async update(id: string, data: IUpdateExpertDTO) {
		const updatedExpert = await this.expertRepository.update(id, data);
		if (!updatedExpert)
			throw new Error("Especialista não encontrado para atualização");
		return updatedExpert;
	}

	public async delete(id: string) {
		const deletedExpert = await this.expertRepository.delete(id);
		if (!deletedExpert)
			throw new Error("Especialista não encontrado para exclusão");
		return deletedExpert;
	}
}
