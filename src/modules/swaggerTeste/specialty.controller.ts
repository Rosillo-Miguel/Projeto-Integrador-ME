import type { Request, Response } from "express";
import type { SpecialtyService } from "./specialty.service.js";
import type {
	ICreateSpecialtyDTO,
	IUpdateSpecialtyDTO,
} from "./specialty.types.js";

export class SpecialtyController {
	constructor(private specialtyService: SpecialtyService) {}

	public async create(request: Request, response: Response): Promise<Response> {
		try {
			const body = request.body as ICreateSpecialtyDTO;
			const specialty = await this.specialtyService.create(body);
			return response.status(201).json(specialty);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	public async find(request: Request, response: Response): Promise<Response> {
		try {
			const page = parseInt(request.query.page as string) || 1;
			const limit = parseInt(request.query.limit as string) || 10;
			const search = request.query.search as string | undefined;
			const result = await this.specialtyService.findAll({
				page,
				limit,
				search,
			});
			return response.status(200).json(result);
		} catch (error: any) {
			return response.status(500).json({ message: error.message });
		}
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		if (!id || typeof id !== "string") {
			return response.status(400).json({ message: "Id inválido" });
		}

		try {
			const body = request.body as IUpdateSpecialtyDTO;
			const specialty = await this.specialtyService.update(id, body);
			return response.json(specialty);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		if (!id || typeof id !== "string") {
			return response.status(400).json({ message: "Id inválido" });
		}

		try {
			const specialty = await this.specialtyService.delete(id);
			return response.json(specialty);
		} catch (error: any) {
			return response.status(404).json({ message: error.message });
		}
	}
}
