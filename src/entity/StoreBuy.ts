export class StoreBuy {
	quantity = 0;
	productId = '';

	static from(obj: StoreBuy): StoreBuy {
		const store = new StoreBuy();
		store.quantity = obj.quantity;
		store.productId = obj.productId;
		return store;
	}
}
