import neo4j, { Driver } from 'neo4j-driver';

import { config } from '../config/configuration';
import logger from '../config/logger';

export class Neo4j {
	private driver: Driver;
	constructor() {
		const { username = '', password = '', uri = '' } = config.neo4j;
		this.driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
		this.driver
			.getServerInfo()
			.then((serverInfo) => {
				logger.info(`Connected to ${serverInfo.address} as user ${username}`);
			})
			.catch((error) => {
				logger.error(error);
			});
	}

	getDriver(): Driver {
		return this.driver;
	}
}
