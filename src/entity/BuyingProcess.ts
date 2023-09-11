import { randomUUID } from 'crypto';

export class BuyingProcess {
	id = '';
	productId = '';
	quantity = 0;
	status = '';

	static from(obj: Partial<BuyingProcess>): BuyingProcess {
		let buyingProcess = new BuyingProcess();
		buyingProcess.id = obj.id ?? randomUUID();
		buyingProcess = Object.assign(buyingProcess, obj);
		return buyingProcess;
	}
}
