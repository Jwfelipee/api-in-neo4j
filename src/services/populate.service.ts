import { University } from '../infra/MongoSchemas/University';
import { IHttp } from '../interfaces/IHttp';

export class PopulateService {
	private countries = ['argentina', 'brasil', 'chile', 'colombia', 'paraguai', 'peru', 'suriname', 'uruguay'];

	constructor(private http: IHttp) {}

	public async execute(): Promise<any> {
		const url = 'http://universities.hipolabs.com/search?country=';
		const data = [];

		for (const country of this.countries) {
			const response = await this.http.get(url + country);
			data.push(response);
		}

		University.insertMany(data.flat());

		return data;
	}
}
