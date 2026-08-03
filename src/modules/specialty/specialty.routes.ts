import { Router } from "express";
import { SpecialtyController } from "./specialty.controller.js";
import { SpecialtyRepository } from "./specialty.repository.js";
import { SpecialtyService } from "./specialty.service.js";

const specialtyRoutes = Router();

const repository = new SpecialtyRepository();
const service = new SpecialtyService(repository);
const controller = new SpecialtyController(service);

specialtyRoutes.get("/", (req, res) => controller.find(req, res));
specialtyRoutes.post("/", (req, res) => controller.create(req, res));
specialtyRoutes.put("/:id", (req, res) => controller.update(req, res));
specialtyRoutes.delete("/:id", (req, res) => controller.delete(req, res));

export default specialtyRoutes;
