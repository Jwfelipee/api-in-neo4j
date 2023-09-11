import { Driver } from 'neo4j-driver';

import { Stock } from '../entity';

export class StockRepository {
	constructor(private dbConnection: Driver) {}

	async getAll(): Promise<any[]> {
		const session = this.dbConnection.session();
		const result = await session.run('MATCH (s:Stock) RETURN s');
		const { records } = result;
		const stocks = records.map((record) => Stock.from(record.get('s').properties));
		return stocks;
	}

	async create(stock: Stock): Promise<void> {
		const session = this.dbConnection.session();
		await session.run('CREATE (s:Stock {id: $id, quantity: $quantity, productId: $productId})', stock);
		await session.run(
			`
			MATCH (p:Product {id: $productId})
			MATCH (s:Stock {id: $id})
			MERGE (s)-[:HAS_STOCK]->(p)
		`,
			stock
		);
	}

	async delete(id: string): Promise<void> {
		const session = this.dbConnection.session();
		await session.run(
			`
			MATCH (s:Stock {id: $id})-[r:HAS_STOCK]->(p:Product)
			DELETE r
		`,
			{ id }
		);
		await session.run('MATCH (s:Stock {id: $id}) DELETE s', { id });
	}

	async checkStock(productId: string, quantity: number): Promise<boolean> {
		const session = this.dbConnection.session();
		const result = await session.run(
			`
			MATCH (p:Product {id: $productId})
			MATCH (s:Stock {productId: $productId})
			RETURN s.quantity >= $quantity AS exists
		`,
			{ productId, quantity }
		);
		const { records } = result;
		const exists = records[0].get('exists');
		return exists;
	}

	async decrementStock(productId: string, quantity: number): Promise<void> {
		const session = this.dbConnection.session();
		await session.run(
			`
			MATCH (s:Stock {productId: $productId})
			SET s.quantity = s.quantity - $quantity
		`,
			{ productId, quantity }
		);
	}
}
