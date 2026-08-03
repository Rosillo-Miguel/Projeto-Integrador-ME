import { Router } from "express";
import { ExpertController } from "./expert.controller.js";
import { ExpertRepository } from "./expert.repository.js";
import { ExpertService } from "./expert.service.js";

const expertRoutes = Router();

const repository = new ExpertRepository();
const service = new ExpertService(repository);
const controller = new ExpertController(service);

expertRoutes.get("/", (req, res) => controller.find(req, res));
expertRoutes.post("/", (req, res) => controller.create(req, res));
expertRoutes.put("/:id", (req, res) => controller.update(req, res));
expertRoutes.delete("/:id", (req, res) => controller.delete(req, res));

export default expertRoutes;
