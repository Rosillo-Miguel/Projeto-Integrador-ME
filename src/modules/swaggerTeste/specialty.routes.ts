import { Router } from "express";
import { SpecialtyController } from "./specialty.controller.js";
import { SpecialtyRepository } from "./specialty.repository.js";
import { SpecialtyService } from "./specialty.service.js";

const swaggerRoutes = Router();

const repository = new SpecialtyRepository();
const service = new SpecialtyService(repository);
const controller = new SpecialtyController(service);

swaggerRoutes.get("/", (req, res) => controller.find(req, res));
swaggerRoutes.post("/", (req, res) => controller.create(req, res));
swaggerRoutes.put("/:id", (req, res) => controller.update(req, res));
swaggerRoutes.delete("/:id", (req, res) => controller.delete(req, res));

export default swaggerRoutes;
