import logger from '../config/logger';
import { mongoose } from '../infra/Mongo';
import { IRepositoryCrud } from '../interfaces/IRepository';

export class Repository<T = any> implements IRepositoryCrud<T> {
	constructor(
		// eslint-disable-next-line @typescript-eslint/ban-types
		readonly collection: mongoose.Model<T, {}, {}, {}, any>
	) {}

	async getAll(): Promise<T[]> {
		return await this.collection.find().exec();
	}

	async getById(id: any): Promise<T | undefined> {
		try {
			const result = await this.collection.findById(id).exec();

			if (!result) {
				return undefined;
			}

			return result;
		} catch (e) {
			logger.info(e);
			throw new Error('Not found');
		}
	}

	async create(p: T): Promise<T> {
		try {
			const result = await this.collection.create(p);

			return result;
		} catch (e) {
			logger.info(e);
			throw new Error('Internal error');
		}
	}

	async update(p: Partial<T>): Promise<T> {
		try {
			const result = await this.collection.findByIdAndUpdate((p as any)?.id, p, { new: true }).exec();

			if (!result) {
				throw new Error('Not found');
			}

			return result;
		} catch (e) {
			logger.info(e);
			throw new Error('Not found');
		}
	}

	async delete(id: any): Promise<boolean> {
		try {
			const result = await this.collection.findById(id).exec();

			if (!result) {
				throw new Error('Not found');
			}

			await this.collection.findByIdAndRemove(id).exec();

			return true;
		} catch (e) {
			logger.info(e);
			throw new Error('Not found');
		}
	}
}
