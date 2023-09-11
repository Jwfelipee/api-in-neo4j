import { Stock } from '../entity';
import { StockRepository } from '../repositories';

export class StockService {
	constructor(private stockRepository: StockRepository) {}

	async getAll(): Promise<any[]> {
		return await this.stockRepository.getAll();
	}

	async create(stock: Stock): Promise<void> {
		await this.stockRepository.create(stock);
	}

	async delete(id: string): Promise<void> {
		await this.stockRepository.delete(id);
	}
}
