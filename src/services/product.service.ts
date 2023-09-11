import { Product } from '../entity';
import { ProductRepository } from '../repositories';

export class ProductService {
	constructor(private productRepository: ProductRepository) {}

	async getAll(): Promise<any[]> {
		return this.productRepository.getAll();
	}

	async create(product: Product): Promise<void> {
		await this.productRepository.create(product);
	}

	async delete(id: string): Promise<void> {
		await this.productRepository.delete(id);
	}
}
