import { cutByPage } from '../helpers/CutByPage';
import { IUniversityRepository } from '../interfaces/IUniversityRepository';
import { IUniversity } from '../types/IUniversity';

type IUniversityOut = {
	nome: string;
	país: string;
	_id: string;
	estado: string;
};

export class UniversityService {
	constructor(readonly universityRepository: IUniversityRepository) {}

	async getAll(country: string | undefined, page: number | undefined, quantity_in_page: number | undefined): Promise<{ universities: IUniversityOut[]; pages: number }> {
		const result = await this.universityRepository.getAll(country);
		const universities = result.map((university) => {
			return {
				_id: university.id,
				nome: university.name,
				estado: university['state-province'],
				país: university.country,
			};
		});

		const { list, pages } = cutByPage(quantity_in_page, page, universities);

		return {
			universities: list,
			pages,
		};
	}

	async getById(id: string): Promise<IUniversity | undefined> {
		const result = await this.universityRepository.getById(id);

		if (!result) {
			throw {
				message: 'Universidade não encontrada',
				code: 404,
			};
		}

		return result;
	}

	async create(university: Omit<IUniversity, 'id'>): Promise<IUniversityOut> {
		const exist = await this.universityRepository.getByNameStateCountry(university.name, university['state-province'], university.country);

		if (exist) {
			throw { message: 'Universidade já cadastrada', code: 409 };
		}

		const result = await this.universityRepository.create(university);

		return {
			_id: result.id,
			nome: result.name,
			estado: result['state-province'],
			país: result.country,
		};
	}

	async update(id: string, university: Omit<IUniversity, 'id' | 'country' | 'state-province' | 'alpha_two_code'>): Promise<IUniversityOut | undefined> {
		const exists = await this.universityRepository.getById(id);
		if (!exists) {
			throw { message: 'Universidade não encontrada', code: 404 };
		}

		const result = await this.universityRepository.update({ ...university, id });

		if (!result) {
			return undefined;
		}

		return {
			_id: result.id,
			nome: result.name,
			estado: result['state-province'],
			país: result.country,
		};
	}

	async delete(id: string): Promise<boolean> {
		const exists = await this.universityRepository.getById(id);
		if (!exists) {
			throw { message: 'Universidade não encontrada', code: 404 };
		}

		const result = await this.universityRepository.delete(id);

		return result;
	}
}
