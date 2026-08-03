import type { FindAllParams } from "../../types/response.types.js";
import type {
	ICreateSpecialtyDTO,
	ISpecialtyRepository,
	IUpdateSpecialtyDTO,
} from "./specialty.types.js";

export class SpecialtyService {
	constructor(private specialtyRepository: ISpecialtyRepository) {}

	public async create(data: ICreateSpecialtyDTO) {
		return await this.specialtyRepository.create(data);
	}

	public async findAll({ page, limit, search }: FindAllParams) {
		return await this.specialtyRepository.findAll(page, limit, search);
	}

	public async update(id: string, data: IUpdateSpecialtyDTO) {
		const updatedSpecialty = await this.specialtyRepository.update(id, data);

		if (!updatedSpecialty) {
			throw new Error("Especialidade não encontrada para atualização");
		}

		return updatedSpecialty;
	}

	public async delete(id: string) {
		const deletedSpecialty = await this.specialtyRepository.delete(id);

		if (!deletedSpecialty) {
			throw new Error("Especialidade não encontrada para exclusão");
		}

		return deletedSpecialty;
	}
}
