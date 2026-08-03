import type {
	FindAllParams,
	IPaginatedResult,
} from "../../types/response.types.js";

export interface ICreateExpertDTO {
	name: string;
	cpf: string;
	dateOfBirth: Date;
	sex: string;
	specialty: string;
	professionalDocument: string;
	phone?: string;
	email?: string;
	address?: {
		cep?: string;
		street?: string;
		complement?: string;
		number?: string;
		city?: string;
		state?: string;
	};
}

export interface IUpdateExpertDTO {
	name?: string;
	cpf?: string;
	dateOfBirth?: Date;
	sex: string;
	specialty?: string;
	professionalDocument?: string;
	phone?: string;
	email?: string;
	address?: {
		cep?: string;
		street?: string;
		complement?: string;
		number?: string;
		city?: string;
		state?: string;
	};
}

export interface IExpert {
	id?: string;
	name: string;
	cpf: string;
	dateOfBirth: Date;
	sex: string;
	specialty: string | any;
	professionalDocument: string;
	phone?: string;
	email?: string;
	address?: {
		cep?: string;
		street?: string;
		complement?: string;
		number?: string;
		city?: string;
		state?: string;
	};
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IFindAllExpertParams extends FindAllParams {
	specialty?: string | undefined;
}

export interface IExpertRepository {
	create(data: ICreateExpertDTO): Promise<IExpert>;
	findAll({
		page,
		limit,
		search,
		specialty,
	}: IFindAllExpertParams): Promise<IPaginatedResult<IExpert>>;
	findById(id: string): Promise<IExpert | null>;
	update(id: string, data: IUpdateExpertDTO): Promise<IExpert | null>;
	delete(id: string): Promise<IExpert | null>;
}
