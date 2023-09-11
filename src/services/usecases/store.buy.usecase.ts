import { StoreBuy } from '../../entity';
import { BuyingProcess } from '../../entity/BuyingProcess';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { StockRepository, StoreRepository } from '../../repositories';

export class StoreBuyUseCase {
	constructor(private storeRepository: StoreRepository, private stockRepository: StockRepository) {}

	async buy(input: StoreBuy): Promise<BuyingProcess> {
		const exists = await this.stockRepository.checkStock(input.productId, input.quantity);
		if (!exists) {
			throw ErrorHandler.badRequest('Sem estoque disponível');
		}
		const buyingProcess = BuyingProcess.from({ ...input, status: 'COMPLETED' });
		await this.storeRepository.createBuyingProcess(buyingProcess);
		await this.stockRepository.decrementStock(input.productId, input.quantity);
		return buyingProcess;
	}
}
