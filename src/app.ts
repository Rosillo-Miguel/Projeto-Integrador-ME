import cors from "cors";
import type { Express } from "express";
import express from "express";
import routes from "./routes.js";
//Import swagger
import swagger from 'swagger-ui-express';
// arquivo de swagger.ts com nome 
import {swaggerSpec} from './config/swagger.js' 
// variavel do 
const swaggerUi = swagger;

class App {
	public server: Express;

	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}

	private middlewares(): void {
		this.server.use(cors());
		this.server.use(express.json());
		this.server.use(express.urlencoded({ extended: true }));
		// endpoint da documentação gerada pelo swagger. "/docs" pode ser mudado mas esse é o padrão
		this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
	}

	private routes(): void {
		this.server.use("/api/v1", routes);
	}
}

export default new App().server;
