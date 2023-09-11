import cors from 'cors';
import express, { Request, Response } from 'express';

import packageJson from '../package.json';
import { config } from './config/configuration';
import logger from './config/logger';
import { apiRoutes } from './controller/routes';
import { factory } from './infra/factory';
import { Neo4j } from './infra/neo4j';

const dbConnection = new Neo4j().getDriver();

const app = express();
const PORT = config.server.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(apiRoutes);

app.get('/', (req: Request, res: Response) => {
	res.status(200).send({
		message: `Welcome to the API '${packageJson.name}'!`,
		version: '1.0.0',
	});
});

export const { productService, storeService, stockService, productRepository, storeRepository, stockRepository } = factory(dbConnection);
export { PORT, dbConnection };
export default app;

app.listen(PORT, () => {
	logger.info(`Server ${packageJson.name} is running on port ${PORT}`);
});
