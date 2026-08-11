import type { IPaginatedResult } from "../../types/response.types.js";

export interface ISpecialty {
	_id?: string;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICreateSpecialtyDTO {
	name: string;
}

export interface IUpdateSpecialtyDTO {
	name?: string;
}
export interface ISpecialtyRepository {
	create(data: ICreateSpecialtyDTO): Promise<ISpecialty>;
	findAll(
		page?: number,
		limit?: number,
		search?: string,
	): Promise<IPaginatedResult<ISpecialty>>;
	findById(id: string): Promise<ISpecialty | null>;
	update(id: string, data: IUpdateSpecialtyDTO): Promise<ISpecialty | null>;
	delete(id: string): Promise<ISpecialty | null>;
}
