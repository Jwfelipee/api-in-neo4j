import { StoreBuy } from '../entity';
import { BuyingProcess } from '../entity/BuyingProcess';
import { StockRepository, StoreRepository } from '../repositories';
import { StoreBuyUseCase } from './usecases';

export class StoreService {
	private buyUsecase: StoreBuyUseCase;
	constructor(private storeRepository: StoreRepository, private stockRepository: StockRepository) {
		this.buyUsecase = new StoreBuyUseCase(this.storeRepository, this.stockRepository);
	}

	async buy(input: StoreBuy): Promise<BuyingProcess> {
		return this.buyUsecase.buy(input);
	}
}
