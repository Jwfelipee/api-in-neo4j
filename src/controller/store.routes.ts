import { Router } from 'express';

import { StoreBuy } from '../entity';
import { storeService } from '../server';

const storeRoute = Router();

storeRoute.post('/buy', async (req, res) => {
	try {
		const { body } = req;
		const storeBuy = StoreBuy.from(body);
		const result = await storeService.buy(storeBuy);
		res.status(201).send(result);
	} catch (error: any) {
		res.status(error?.code || 500).json({ error: error?.message || 'Internal server error' });
	}
});

export { storeRoute };
