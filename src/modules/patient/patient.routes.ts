import { Router } from "express";
import { PatientController } from "./patient.controller.js";
import { PatientRepository } from "./patient.repository.js";
import { PatientService } from "./patient.service.js";

const patientRoutes = Router();

const repository = new PatientRepository();
const service = new PatientService(repository);
const controller = new PatientController(service);

patientRoutes.get("/", (req, res) => controller.find(req, res));
patientRoutes.post("/", (req, res) => controller.create(req, res));
patientRoutes.put("/:id", (req, res) => controller.update(req, res));
patientRoutes.delete("/:id", (req, res) => controller.delete(req, res));

export default patientRoutes;
