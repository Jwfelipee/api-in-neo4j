import { Router } from 'express';

import { Product } from '../entity';
import { productService } from '../server';

const productRoute = Router();

productRoute.get('', async (req, res) => {
	try {
		const products = await productService.getAll();
		res.status(200).send(products);
	} catch (error: any) {
		res.status(error?.code || 500).json({ error: error?.message || 'Internal server error' });
	}
});

productRoute.post('', async (req, res) => {
	try {
		const { body } = req;
		const product = Product.from(body);
		await productService.create(product);
		res.status(201).send(product);
	} catch (error: any) {
		res.status(error?.code || 500).json({ error: error?.message || 'Internal server error' });
	}
});

productRoute.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		await productService.delete(id);
		res.status(204).send();
	} catch (error: any) {
		res.status(error?.code || 500).json({ error: error?.message || 'Internal server error' });
	}
});

export { productRoute };
