import { Router } from 'express';

import { Stock } from '../entity';
import { stockService } from '../server';

const stockRoute = Router();

stockRoute.get('', async (req, res) => {
	try {
		const stock = await stockService.getAll();
		res.status(200).send(stock);
	} catch (error: any) {
		res.status(error?.code || 500).json({ error: error?.message || 'Internal server error' });
	}
});

stockRoute.post('', async (req, res) => {
	try {
		const { body } = req;
		const stock = Stock.from(body);
		await stockService.create(stock);
		res.status(201).send(stock);
	} catch (error: any) {
		res.status(error?.code || 500).json({ error: error?.message || 'Internal server error' });
	}
});

stockRoute.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		await stockService.delete(id);
		res.status(204).send();
	} catch (error: any) {
		res.status(error?.code || 500).json({ error: error?.message || 'Internal server error' });
	}
});

export { stockRoute };
