import express from 'express';

import { populateRoute } from './populate.routes';
import { universitiesRoute } from './universities.routes';

const apiRoutes = express.Router();

apiRoutes.use('/populate', populateRoute);
apiRoutes.use('/universities', universitiesRoute);

export { apiRoutes };
