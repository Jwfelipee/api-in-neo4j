import dotenv from 'dotenv';

dotenv.config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const config = {
	neo4j: {
		uri: process.env.NEO4J_URI,
		username: process.env.NEO4J_USERNAME,
		password: process.env.NEO4J_PASSWORD,
	},
	aura: {
		instanceId: process.env.AURA_INSTANCEID,
		instanceName: process.env.AURA_INSTANCENAME,
	},
	server: {
		port: process.env.SERVER_PORT,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN,
	},
};

export { config };
