import { randomUUID } from 'crypto';

export class Product {
	id = '';
	name = '';
	description = '';
	price = 0;

	static from(obj: Product): Product {
		const product = new Product();
		product.id = obj.id ?? randomUUID();
		product.name = obj.name;
		product.description = obj.description;
		product.price = obj.price;
		return product;
	}
}
