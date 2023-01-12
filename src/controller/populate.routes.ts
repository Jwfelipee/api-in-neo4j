import { Router } from 'express';

import { populateService } from '../app';

const populateRoute = Router();

populateRoute.get('', (req, res) => {
	try {
		populateService.execute();
		res.send('hello');
	} catch (error: any) {
		res.status(error?.code || 500).send(error?.message || 'Internal server error');
	}
});

export { populateRoute };
