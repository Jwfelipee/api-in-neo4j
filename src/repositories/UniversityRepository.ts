import { Repository } from '../adapter/MongoRepository';
import { IUniversityRepository } from '../interfaces/IUniversityRepository';
import { IUniversity } from '../types/IUniversity';

export class UniversityRepository extends Repository<IUniversity> implements IUniversityRepository {
	async getAll(country?: string): Promise<any[]> {
		return this.collection.find({
			country: country || { $exists: true },
		});
	}

	async getByNameStateCountry(name: string, state: string, country: string): Promise<IUniversity | undefined> {
		const result = await this.collection.findOne({
			name,
			'state-province': state,
			country,
		});

		if (!result) {
			return undefined;
		}

		return result;
	}
}
