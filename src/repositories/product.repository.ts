import { Driver } from 'neo4j-driver';

import { Product } from '../entity';

export class ProductRepository {
	constructor(private dbConnection: Driver) {}

	async getAll(): Promise<any[]> {
		const session = this.dbConnection.session();
		const result = await session.run(`MATCH (p:Product) RETURN p`);
		const { records } = result;
		const products = records.map((record) => Product.from(record.get('p').properties));
		return products;
	}

	async create(product: Product): Promise<void> {
		const session = this.dbConnection.session();
		await session.run('CREATE (p:Product {id: $id, name: $name, description: $description, price: $price})', product);
	}

	async delete(id: string): Promise<void> {
		const session = this.dbConnection.session();
		await session.run('MATCH (p:Product {id: $id}) DELETE p', { id });
	}
}
