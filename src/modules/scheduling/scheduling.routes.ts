import { Router } from "express";
import { SchedulingController } from "./scheduling.controller.js";
import { SchedulingRepository } from "./scheduling.repository.js";
import { SchedulingService } from "./scheduling.service.js";

const schedulingRoutes = Router();

const repository = new SchedulingRepository();
const service = new SchedulingService(repository);
const controller = new SchedulingController(service);

schedulingRoutes.get("/", (req, res) => controller.find(req, res));
schedulingRoutes.post("/", (req, res) => controller.create(req, res));
schedulingRoutes.put("/:id", (req, res) => controller.update(req, res));
schedulingRoutes.delete("/:id", (req, res) => controller.delete(req, res));

export default schedulingRoutes;
