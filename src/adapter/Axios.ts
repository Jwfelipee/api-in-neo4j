import axios from 'axios';

import { IHttp } from '../interfaces/IHttp';

export class AxiosAdapter implements IHttp {
	public async get(url: string): Promise<any[]> {
		const response = await axios.get<any>(url);
		return response.data;
	}
}
