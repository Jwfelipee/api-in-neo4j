import { Product } from '../entity';
import { ErrorHandler } from '../helpers/ErrorHandler';
import { ProductRepository, StockRepository, StoreRepository } from '../repositories';

export class ProductService {
	constructor(private productRepository: ProductRepository, private storeRepository: StoreRepository, private stockRepository: StockRepository) {}

	async getAll(): Promise<any[]> {
		const stock = await this.stockRepository.getAll();
		const products = await this.productRepository.getAll();
		const productsWithStock = products.map((product) => {
			const stockProduct = stock.find((s) => s.productId === product.id);
			return { ...product, quantity: stockProduct?.quantity || 0 };
		});
		return productsWithStock;
	}

	async create(product: Product): Promise<void> {
		await this.productRepository.create(product);
	}

	async delete(id: string): Promise<void> {
		const haveStoreProcess = await this.storeRepository.validateProcessByProductId(id);
		if (haveStoreProcess) {
			throw ErrorHandler.badRequest('Este produto está sendo utilizado em um processo de compra');
		}
		await this.productRepository.delete(id);
	}
}
