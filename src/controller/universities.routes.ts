import { Router } from 'express';

import { University } from '../infra/MongoSchemas/University';
import { UniversityRepository } from '../repositories/UniversityRepository';
import { UniversityService } from '../services/universities.service';

const universitiesRoute = Router();
const universityRepository = new UniversityRepository(University);
const universityService = new UniversityService(universityRepository);

universitiesRoute.get('', async (req, res) => {
	try {
		const query = req.query;
		const universities = await universityService.getAll(query?.country as any as string | undefined, query?.page as any as number | undefined, query?.quantity_in_page as any as number | undefined);
		res.status(200).send(universities);
	} catch (error: any) {
		res.status(error?.code || 500).send(error?.message || 'Internal server error');
	}
});

universitiesRoute.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const university = await universityService.getById(id);
		res.status(200).send(university);
	} catch (error: any) {
		res.status(error?.code || 500).send(error?.message || 'Internal server error');
	}
});

universitiesRoute.post('', async (req, res) => {
	try {
		const university = req.body;
		const result = await universityService.create(university);
		res.status(200).send(result);
	} catch (error: any) {
		res.status(error?.code || 500).send(error?.message || 'Internal server error');
	}
});

universitiesRoute.put('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const university = req.body;
		const result = await universityService.update(id, university);
		res.status(200).send(result);
	} catch (error: any) {
		res.status(error?.code || 500).send(error?.message || 'Internal server error');
	}
});

universitiesRoute.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		await universityService.delete(id);
		res.status(200).send();
	} catch (error: any) {
		res.status(error?.code || 500).send(error?.message || 'Internal server error');
	}
});

export { universitiesRoute };
