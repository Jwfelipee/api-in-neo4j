import { IUniversity } from '../types/IUniversity';
import { IRepositoryCreate, IRepositoryDelete, IRepositoryUpdate } from './IRepository';

export interface IUniversityRepository extends IRepositoryDelete, IRepositoryCreate<IUniversity>, IRepositoryUpdate<IUniversity> {
	getAll(country?: string): Promise<IUniversity[]>;
	getById(id: string): Promise<IUniversity | undefined>;
	getByNameStateCountry(name: string, state: string, country: string): Promise<IUniversity | undefined>;
}
