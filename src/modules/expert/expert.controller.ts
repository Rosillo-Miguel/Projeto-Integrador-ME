import type { Request, Response } from "express";
import type { ExpertService } from "./expert.service.js";
import type { ICreateExpertDTO, IUpdateExpertDTO } from "./expert.types.js";

export class ExpertController {
	constructor(private expertService: ExpertService) {}

	public async create(request: Request, response: Response): Promise<Response> {
		try {
			const body = request.body as ICreateExpertDTO;
			const expert = await this.expertService.create(body);
			return response.status(201).json(expert);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	public async find(request: Request, response: Response): Promise<Response> {
		try {
			const specialtyId = request.query.specialtyId as string | undefined;
			const search = request.query.search as string | undefined;

			const page = parseInt(request.query.page as string) || 1;
			const limit = parseInt(request.query.limit as string) || 10;

			const result = await this.expertService.findAll({
				page,
				limit,
				search,
				specialty: specialtyId,
			});

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
			const body = request.body as IUpdateExpertDTO;
			const expert = await this.expertService.update(id, body);
			return response.json(expert);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		if (!id || typeof id !== "string")
			return response.status(400).json({ message: "Id invalido" });

		try {
			const expert = await this.expertService.delete(id);
			return response.json(expert);
		} catch (error: any) {
			return response.status(404).json({ message: error.message });
		}
	}
}
