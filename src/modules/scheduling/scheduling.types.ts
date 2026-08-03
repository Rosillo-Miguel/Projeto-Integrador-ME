import type { Types } from "mongoose";
import type {
	FindAllParams,
	IPaginatedResult,
} from "../../types/response.types.js";

export interface IScheduling {
	_id?: string;
	dateScheduling: Date;
	status: string;
	patient: Types.ObjectId | string;
	expert: Types.ObjectId | string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICreateSchedulingDTO {
	dateScheduling: Date | string;
	status: string;
	patient: string;
	expert: string;
}

export interface IUpdateSchedulingDTO extends Partial<ICreateSchedulingDTO> {}

export interface ISchedulingRepository {
	create(data: ICreateSchedulingDTO): Promise<IScheduling>;
	findAll({
		page,
		limit,
		search,
	}: FindAllParams): Promise<IPaginatedResult<IScheduling>>;
	findById(id: string): Promise<IScheduling | null>;
	update(id: string, data: IUpdateSchedulingDTO): Promise<IScheduling | null>;
	delete(id: string): Promise<IScheduling | null>;
}
