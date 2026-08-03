import type { Request, Response } from "express";
import type { SchedulingService } from "./scheduling.service.js";
import type {
	ICreateSchedulingDTO,
	IUpdateSchedulingDTO,
} from "./scheduling.types.js";

export class SchedulingController {
	constructor(private schedulingService: SchedulingService) {}

	public async create(request: Request, response: Response): Promise<Response> {
		try {
			const body = request.body as ICreateSchedulingDTO;
			const scheduling = await this.schedulingService.create(body);
			return response.status(201).json(scheduling);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	public async find(request: Request, response: Response): Promise<Response> {
		try {
			const page = parseInt(request.query.page as string) || 1;
			const limit = parseInt(request.query.limit as string) || 10;
			const search = request.query.search as string | undefined;
			const schedulings = await this.schedulingService.findAll({
				page,
				limit,
				search,
			});
			return response.status(200).json(schedulings);
		} catch (error: any) {
			return response.status(500).json({ message: error.message });
		}
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		if (!id || typeof id !== "string") {
			return response.status(400).json({ message: "Id invalido" });
		}

		try {
			const body = request.body as IUpdateSchedulingDTO;
			const scheduling = await this.schedulingService.update(id, body);
			return response.json(scheduling);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		if (!id || typeof id !== "string") {
			return response.status(400).json({ message: "Id invalido" });
		}

		try {
			const scheduling = await this.schedulingService.delete(id);
			return response.json(scheduling);
		} catch (error: any) {
			return response.status(404).json({ message: error.message });
		}
	}
}
