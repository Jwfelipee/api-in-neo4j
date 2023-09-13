import { Driver } from 'neo4j-driver';

import { BuyingProcess } from '../entity/BuyingProcess';

export class StoreRepository {
	constructor(private dbConnection: Driver) {}

	async createBuyingProcess(buyingProcess: BuyingProcess): Promise<void> {
		const session = this.dbConnection.session();
		await session.run(
			`
			CREATE (bp:BuyingProcess {id: $id, productId: $productId, quantity: $quantity, status: $status})
		`,
			buyingProcess
		);
		await session.run(
			`
			MATCH (bp:BuyingProcess {id: $id})
			MATCH (p:Product {id: $productId})
			MATCH (s:Stock {productId: $productId})
			MERGE (bp)-[:BUYING_PROCESS_OF]->(p)
			MERGE (bp)-[:BUYING_PROCESS_OF]->(s)
		`,
			buyingProcess
		);
	}

	async validateProcessByProductId(productId: string): Promise<boolean> {
		const session = this.dbConnection.session();
		const result = await session.run(
			`
			MATCH (bp:BuyingProcess)-[:BUYING_PROCESS_OF]->(p:Product {id: $productId})
			RETURN bp
		`,
			{ productId }
		);
		const { records } = result;
		return records.length > 0;
	}
}
