import { Driver } from 'neo4j-driver';

import { ProductRepository, StockRepository, StoreRepository } from '../repositories';
import { ProductService, StockService, StoreService } from '../services';

interface IFactoryOut {
	productService: ProductService;
	storeService: StoreService;
	stockService: StockService;
	productRepository: ProductRepository;
	storeRepository: StoreRepository;
	stockRepository: StockRepository;
}

export function factory(dbConnection: Driver): IFactoryOut {
	const productRepository = new ProductRepository(dbConnection);
	const stockRepository = new StockRepository(dbConnection);
	const storeRepository = new StoreRepository(dbConnection);
	const productService = new ProductService(productRepository);
	const stockService = new StockService(stockRepository);
	const storeService = new StoreService(storeRepository, stockRepository);

	return {
		productService,
		storeService,
		stockService,
		productRepository,
		storeRepository,
		stockRepository,
	};
}
