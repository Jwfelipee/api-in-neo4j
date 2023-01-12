import cors from 'cors';
import express, { Request, Response } from 'express';

import packageJson from '../package.json';
import { AxiosAdapter } from './adapter/Axios';
import config from './config/configuration';
import { apiRoutes } from './controller/routes';
import { PopulateService } from './services/populate.service';

const http = new AxiosAdapter();

export const populateService = new PopulateService(http);

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

export { PORT };
export default app;
