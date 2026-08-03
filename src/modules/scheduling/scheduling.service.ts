import type { FindAllParams } from "../../types/response.types.js";
import type {
	ICreateSchedulingDTO,
	ISchedulingRepository,
	IUpdateSchedulingDTO,
} from "./scheduling.types.js";

export class SchedulingService {
	constructor(private schedulingRepository: ISchedulingRepository) {}

	public async create(data: ICreateSchedulingDTO) {
		const scheduleDate = new Date(data.dateScheduling);

		if (scheduleDate < new Date()) {
			throw new Error(
				"Não é possível agendar uma consulta para um dia anterior",
			);
		}

		return await this.schedulingRepository.create(data);
	}

	public async findAll({ page, limit, search }: FindAllParams) {
		return await this.schedulingRepository.findAll({ page, limit, search });
	}

	public async update(id: string, data: IUpdateSchedulingDTO) {
		const updatedScheduling = await this.schedulingRepository.update(id, data);

		if (!updatedScheduling) {
			throw new Error("Agendamento não encontrado para atualização");
		}

		return updatedScheduling;
	}

	public async delete(id: string) {
		const deletedScheduling = await this.schedulingRepository.delete(id);

		if (!deletedScheduling) {
			throw new Error("Agendamento não encontrado para exclusão");
		}

		return deletedScheduling;
	}
}
