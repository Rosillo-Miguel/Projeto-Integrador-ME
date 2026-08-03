import type { Request, Response } from "express";
import type { PatientService } from "./patient.service.js";
import type { ICreatePatientDTO, IUpdatePatientDTO } from "./patient.types.js";

export class PatientController {
	constructor(private patientService: PatientService) {}

	public async create(request: Request, response: Response): Promise<Response> {
		try {
			const body = request.body as ICreatePatientDTO;
			const patient = await this.patientService.create(body);
			return response.status(201).json(patient);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	public async find(request: Request, response: Response): Promise<Response> {
		try {
			const search = request.query.search as string | undefined;
			const page = parseInt(request.query.page as string) || 1;
			const limit = parseInt(request.query.limit as string) || 10;
			const result = await this.patientService.findAll({ search, page, limit });
			return response.status(200).json(result);
		} catch (error: any) {
			return response.status(500).json({ message: error.message });
		}
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		if (!id || typeof id !== "string")
			return response.status(400).json({ message: "Id invalido" });

		try {
			const body = request.body as IUpdatePatientDTO;
			const patient = await this.patientService.update(id, body);
			return response.json(patient);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		if (!id || typeof id !== "string")
			return response.status(400).json({ message: "Id invalido" });

		try {
			const patient = await this.patientService.delete(id);
			return response.json(patient);
		} catch (error: any) {
			return response.status(404).json({ message: error.message });
		}
	}
}
