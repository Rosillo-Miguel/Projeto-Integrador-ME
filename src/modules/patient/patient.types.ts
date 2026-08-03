import { IPaginatedResult } from "../../types/response.types.js";

export interface IAddress {
  cep: string;
  city: string;
  complement?: string;
  number: string;
  state: string;
  street: string;
}

export interface IPatient {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  sex: string;
  dateOfBirth: Date | string;
  address: IAddress;
  status: "A" | "I";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreatePatientDTO extends Omit<
  IPatient,
  "_id" | "createdAt" | "updatedAt" | "status"
> {
  status?: "A" | "I";
}
export interface IUpdatePatientDTO extends Partial<ICreatePatientDTO> {}

export interface IPatientRepository {
  create(data: ICreatePatientDTO): Promise<IPatient>;
  findAll(
    page?: number,
    limit?: number,
    search?: string,
  ): Promise<IPaginatedResult<IPatient>>;
  findById(id: string): Promise<IPatient | null>;
  update(id: string, data: IUpdatePatientDTO): Promise<IPatient | null>;
  delete(id: string): Promise<IPatient | null>;
}
