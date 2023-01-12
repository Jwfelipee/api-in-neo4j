import { IUniversity } from '../../types/IUniversity';
import { mongoose } from '../Mongo';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Schema = mongoose.Schema;
const schemaName = 'universities';

// eslint-disable-next-line @typescript-eslint/naming-convention
const UniversitySchema = new Schema({
	web_pages: [String],
	'state-province': String,
	alpha_two_code: String,
	name: String,
	country: String,
	domains: [String],
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const University = mongoose.model<IUniversity>(schemaName, UniversitySchema);
