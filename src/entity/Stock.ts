import { randomUUID } from 'crypto';

export class Stock {
	id = '';
	quantity = 0;
	productId = '';

	static from(obj: Stock): Stock {
		const stock = new Stock();
		stock.id = obj.id ?? randomUUID();
		stock.quantity = obj.quantity;
		stock.productId = obj.productId;
		return stock;
	}
}
